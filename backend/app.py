from flask import Flask, request, jsonify
from flask_cors import CORS
from db import get_db_connection

app = Flask(__name__)

CORS(app, supports_credentials=True, 
     resources={r"/*": {"origins": "*"}},
     methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
     allow_headers=["Content-Type"])

# Get all students
@app.route('/api/students', methods=['GET'])
def get_students():
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute('SELECT * FROM Student')
        students = cursor.fetchall()

        cursor.close()
        conn.close()

        return jsonify(students)

# Add Student Function 
@app.route ('/api/students', methods=['POST'])
def add_student():
      data = request.get_json()

      conn = get_db_connection()
      cursor = conn.cursor(dictionary=True)

      #create user
      try:
            cursor.execute("""INSERT INTO User (userName, passwordHash, role) VALUES (%s, %s, %s)""", 
            (data['userName'], data['passwordHash'], 'student'))

            user_id = cursor.lastrowid

            # create a student using the created user above
            cursor.execute("""INSERT INTO Student (studentId, name, birthday, grade, school, location, parentName, parentPhone, parentEmail) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)""", 
            (user_id, data['name'], data['birthday'], data['grade'], data['school'], data['location'], data['parentName'], data['parentPhone'], data['parentEmail']))
                
            conn.commit()
            return jsonify({"message": "student added", "studentId": user_id})

      except Exception as e:
            conn.rollback()
            raise e

      finally:
            cursor.close()
            conn.close()
        

# Delete Student Function
@app.route('/api/students/<int:id>', methods=['DELETE'])
def delete_student(id):
        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute('DELETE FROM Student WHERE studentId = %s', (id,))
        conn.commit()

        cursor.close()
        conn.close()

        return jsonify({"message": "student deleted"})

@app.route('/api/students/<int:id>', methods=['GET'])
def get_student_by_id(id):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute('SELECT * FROM Student WHERE studentId = %s', (id,))
    student = cursor.fetchone()

    cursor.close()
    conn.close()

    if student:
        return jsonify(student)
    return jsonify({"message": "student not found"}), 404        

# LOGIN ROUTE ------------------------
@app.route('/api/login', methods=['POST'])
def login():
       data = request.get_json()
       conn = get_db_connection()
       cursor = conn.cursor(dictionary=True)
       
       cursor.execute('SELECT userId, userName, role FROM User WHERE userName = %s AND passwordHash = %s', 
       (data['userName'], data['passwordHash']))
       
       user = cursor.fetchone()
       cursor.close()
       conn.close()

       if user:
        return jsonify(user), 200 # successful login
       return jsonify({"message": "Invalid credentials"}), 401 # give error, unsuccessful login


# TUTOR ROUTES ------------------------

# get all tutors
@app.route('/api/tutors', methods=['GET'])
def get_tutors():
      conn = get_db_connection()
      cursor = conn.cursor(dictionary=True)
      
      cursor.execute('SELECT * FROM Tutor')
      tutors = cursor.fetchall()

      cursor.close()
      conn.close()
      
      return jsonify(tutors)

# add tutor function
@app.route('/api/tutors', methods=['POST'])
def add_tutor():
      data = request.get_json()
      conn = get_db_connection()
      cursor = conn.cursor(dictionary=True)
      try:
            # create user
            cursor.execute("""INSERT INTO User (userName, passwordHash, role) VALUES (%s, %s, %s)""", 
            (data['userName'], data['passwordHash'], 'tutor'))

            user_id = cursor.lastrowid

            # create a tutor 
            cursor.execute("""INSERT INTO Tutor (tutorId, name, isAdmin, birthday, subjects, availability) VALUES (%s, %s, %s, %s, %s, %s)""", 
            (user_id, data['name'], data.get('isAdmin', False), data['birthday'], data['subjects'], data['availability']))
                  

            conn.commit()
            return jsonify({"message": "tutor added", "tutorId": user_id})

      except Exception as e:
            conn.rollback()
            raise e

      finally:
            cursor.close()
            conn.close()

# delete tutor function
@app.route('/api/tutors/<int:id>', methods=['DELETE'])
def delete_tutor(id):
      conn = get_db_connection()
      cursor = conn.cursor()
      
      # delete person from tutor and user tables
      cursor.execute('DELETE FROM Tutor WHERE tutorId = %s', (id,))
      cursor.execute('DELETE FROM User WHERE userId = %s', (id,))
      conn.commit()
      
      cursor.close()
      conn.close()

      return jsonify({"message": "tutor deleted"})

# SESSION ROUTES ------------------------

# SESSION ROUTES ------------------------

# get all sessions
@app.route('/api/sessions', methods=['GET'])
def get_sessions():
      conn = get_db_connection()
      cursor = conn.cursor(dictionary=True)

      cursor.execute('SELECT sessionId, subjects, startDateTime, endDateTime FROM Session')
      sessions = cursor.fetchall()

      cursor.close()
      conn.close()

      return jsonify(sessions)

# add session function
@app.route('/api/sessions', methods=['POST'])
def add_session():
      data = request.get_json()
      conn = get_db_connection()
      cursor = conn.cursor(dictionary=True)

      # check overlap
      cursor.execute("""
      SELECT * FROM Session
      WHERE tutorId = %s
      AND startDateTime < %s
      AND endDateTime > %s
      """,
      (data['tutorId'], data['endDateTime'], data['startDateTime']))

      overlap = cursor.fetchone()

      if overlap:
            cursor.close()
            conn.close()
            return jsonify({"message": "Tutor already has a session during this time"}), 409

      # insert session (ONLY if no overlap)
      cursor.execute("""
      INSERT INTO Session (tutorId, subjects, startDateTime, endDateTime, location)
      VALUES (%s, %s, %s, %s, %s)
      """,
      (data['tutorId'], data['subjects'], data['startDateTime'], data['endDateTime'], data['location']))

      conn.commit()
      session_id = cursor.lastrowid

      cursor.close()
      conn.close()

      return jsonify({"message": "session added", "sessionId": session_id})
# update session function
@app.route('/api/sessions/<int:id>', methods=['PUT'])
def update_session(id):
      data = request.get_json()
      conn = get_db_connection()
      cursor = conn.cursor(dictionary=True)

      cursor.execute("""
      UPDATE Session
      SET subjects = %s,
          startDateTime = %s,
          endDateTime = %s,
          location = %s
      WHERE sessionId = %s
      """,
      (data['subjects'], data['startDateTime'], data['endDateTime'], data['location'], id))

      conn.commit()

      cursor.close()
      conn.close()

      return jsonify({"message": "session updated"})

 # delete session function      
@app.route('/api/sessions/<int:id>', methods=['DELETE'])
def delete_session(id):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute('DELETE FROM SessionReport WHERE sessionId = %s', (id,))
    cursor.execute('DELETE FROM Session WHERE sessionId = %s', (id,))
    conn.commit()

    cursor.close()
    conn.close()

    return jsonify({"message": "session deleted"})


# DASHBOARD STATS ROUTE ------------------------
@app.route('/api/dashboard-stats/<int:userId>/<string:role>')
def get_dashboard_stats(userId, role):
      conn = get_db_connection()
      cursor = conn.cursor(dictionary=True)
      stats = {}
      
      try:
            if role == 'admin':
                  # get total students
                  cursor.execute('SELECT COUNT(*) AS total FROM Student')
                  stats['totalStudents'] = cursor.fetchone()['total']

                  # get total tutors
                  cursor.execute('SELECT COUNT(*) AS total FROM Tutor')
                  stats['totalTutors'] = cursor.fetchone()['total']

                  # get total sessions
                  cursor.execute('SELECT COUNT(*) AS total FROM Session')
                  stats['totalSessions'] = cursor.fetchone()['total']

                  # get 5 upcoming sessions with all info
                  cursor.execute("""SELECT s.sessionId, s.subjects, s.startDateTime, s.endDateTime, s.location, 
                  t.name AS tutorName, st.name AS studentName FROM Session s 
                  LEFT JOIN Tutor t ON s.tutorId = t.tutorId 
                  LEFT JOIN SessionReport sr ON s.sessionId = sr.sessionId 
                  LEFT JOIN Student st ON sr.studentId = st.studentId 
                  WHERE s.startDateTime > NOW() ORDER BY s.startDateTime ASC LIMIT 5""")
                  stats['upcomingSessions'] = cursor.fetchall()
            
            elif role == 'tutor':
            
                  # get total sessions for tutor
                  cursor.execute('SELECT COUNT(*) AS total FROM Session WHERE tutorId = %s', (userId,))
                  stats['totalSessions'] = cursor.fetchone()['total']

                  # find upcoming sessions for tutor
                  cursor.execute("""SELECT s.sessionId, s.subjects, s.startDateTime, s.endDateTime, s.location, 
                  st.name AS studentName FROM Session s 
                  LEFT JOIN SessionReport sr ON s.sessionId = sr.sessionId 
                  LEFT JOIN Student st ON sr.studentId = st.studentId WHERE s.tutorId = %s AND 
                  s.startDateTime > NOW() ORDER BY s.startDateTime ASC LIMIT 5""", (userId,))
                  stats['upcomingSessions'] = cursor.fetchall()

                  # get the total number of students the tutor is currently tutoring
                  cursor.execute("""SELECT COUNT(DISTINCT studentId) AS total FROM SessionReport sr JOIN Session s ON 
                  sr.sessionId = s.sessionId WHERE s.tutorId = %s""", (userId,))
                  stats['totalStudents'] = cursor.fetchone()['total']
            
            elif role == 'student':
                  # get total sessions for student
                  cursor.execute('SELECT COUNT(*) AS total FROM SessionReport WHERE studentId = %s', (userId,))
                  stats['totalSessions'] = cursor.fetchone()['total']

                  # find upcoming sessions for student
                  cursor.execute("""SELECT s.sessionId, s.subjects, s.startDateTime, s.endDateTime, s.location, 
                  t.name AS tutorName FROM Session s 
                  JOIN SessionReport sr ON s.sessionId = sr.sessionId 
                  JOIN Tutor t ON s.tutorId = t.tutorId WHERE sr.studentId = %s AND s.startDateTime > NOW() 
                  ORDER BY s.startDateTime ASC LIMIT 5""", (userId,))
                  stats['upcomingSessions'] = cursor.fetchall()

                  # get the number of subjects the student is being tutored in
                  cursor.execute("""SELECT COUNT(DISTINCT subjects) AS total FROM Session s JOIN 
                  SessionReport ss ON s.sessionId = ss.sessionId WHERE ss.studentId = %s""", (userId,))
                  stats['totalSubjects'] = cursor.fetchone()['total']

                  # get the grade level of the student
                  cursor.execute('SELECT grade FROM Student WHERE studentId = %s', (userId,))
                  stats['grade'] = cursor.fetchone()['grade']


            return jsonify(stats)

      except Exception as e:
            raise e
      
      finally:
            cursor.close()
            conn.close()
      

if __name__ == '__main__':
    app.run(debug=True)
