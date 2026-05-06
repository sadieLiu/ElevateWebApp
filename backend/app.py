from flask import Flask, request, jsonify
from flask_cors import CORS
from db import get_db_connection
from datetime import datetime

app = Flask(__name__)

CORS(app)

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
@app.route('/api/students', methods=['POST'])
def add_student():
    data = request.get_json()

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    try:
        cursor.execute(
            """INSERT INTO User (userName, passwordHash, role) VALUES (%s, %s, %s)""",
            (data['userName'], data['passwordHash'], 'student')
        )

        user_id = cursor.lastrowid

        cursor.execute(
            """INSERT INTO Student
            (studentId, name, birthday, grade, school, location, parentName, parentPhone, parentEmail)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)""",
            (
                user_id,
                data['name'],
                data['birthday'],
                data['grade'],
                data['school'],
                data['location'],
                data['parentName'],
                data['parentPhone'],
                data['parentEmail']
            )
        )

        conn.commit()
        return jsonify({"message": "student added", "studentId": user_id})

    except Exception as e:
        conn.rollback()
        raise e
    except Exception as e:
        conn.rollback()
        raise e

    finally:
        cursor.close()
        conn.close()

# edit and update student
@app.route('/api/students/<int:id>', methods=['GET'])
def edit_student(id):
      conn = get_db_connection()
      cursor = conn.cursor(dictionary=True)

      #Get existing studentinfo
      cursor.execute("""SELECT 
            u.userId, 
            u.userName, 
            u.passwordHash, 
            s.studentId,
            s.name, 
            s.birthday, 
            s.grade, 
            s.school,
            s.parentName,
            s.parentPhone,
            s.parentEmail,
            s.location
            FROM User u 
            JOIN Student s ON u.userId = s.studentId 
            WHERE s.studentId = %s""", (id,))
           
      student = cursor.fetchone()
      cursor.close()
      conn.close()

      if not student:
            return jsonify({"message": "student not found"}), 404
      
      if student['birthday']:
            student['birthday'] = student['birthday'].strftime("%Y-%m-%d")

      return jsonify(student)
@app.route('/api/students/<int:id>', methods=['PUT'])
def update_student(id):
    data = request.get_json()
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        # Update User table
            cursor.execute("""
                  UPDATE User 
                  SET userName = %s, 
                  passwordHash = %s
                  WHERE userId = %s
            """, (data['userName'], data['passwordHash'], id))

            # Update Student table
            cursor.execute("""
                    UPDATE Student
                        SET name = %s, 
                        birthday = %s, 
                        grade = %s, 
                        school = %s,
                        location = %s, 
                        parentName = %s, 
                        parentPhone = %s, 
                        parentEmail = %s
                    WHERE studentId = %s 
                """, (
                    data['name'], 
                    data['birthday'], 
                    data['grade'], 
                    data['school'],
                    data['location'], 
                    data['parentName'], 
                    data['parentPhone'], 
                    data['parentEmail'], 
                    id
            ))

            conn.commit()
            return jsonify({"message": "student updated"})
       
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

# LOGIN ROUTE
@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute(
        'SELECT userId, userName, role FROM User WHERE userName = %s AND passwordHash = %s',
        (data['userName'], data['passwordHash'])
    )

    user = cursor.fetchone()
    cursor.close()
    conn.close()

    if user:
        return jsonify(user), 200
    else:
          return jsonify({"message": "Invalid credentials"}), 401

# TUTOR ROUTES

@app.route('/api/tutors', methods=['GET'])
def get_tutors():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute('SELECT * FROM Tutor')
    tutors = cursor.fetchall()

    cursor.close()
    conn.close()

    return jsonify(tutors)
#add tutor
@app.route('/api/tutors', methods=['POST'])
def add_tutor():
    data = request.get_json()
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    try:
        cursor.execute(
            """INSERT INTO User (userName, passwordHash, role) VALUES (%s, %s, %s)""",
            (data['userName'], data['passwordHash'], 'tutor')
        )

        user_id = cursor.lastrowid

        cursor.execute(
            """INSERT INTO Tutor (tutorId, name, isAdmin, birthday, subjects, availability)
            VALUES (%s, %s, %s, %s, %s, %s)""",
            (
                user_id,
                data['name'],
                data.get('isAdmin', False),
                data['birthday'],
                data['subjects'],
                data['availability']
            )
        )

        conn.commit()
        return jsonify({"message": "tutor added", "tutorId": user_id})

    except Exception as e:
        conn.rollback()
        raise e

    finally:
        cursor.close()
        conn.close()

@app.route('/api/tutors/<int:id>', methods=['DELETE'])
def delete_tutor(id):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute('DELETE FROM Tutor WHERE tutorId = %s', (id,))
    cursor.execute('DELETE FROM User WHERE userId = %s', (id,))
    conn.commit()

    cursor.close()
    conn.close()

    return jsonify({"message": "tutor deleted"})

    
# edit and update tutor
@app.route('/api/tutors/<int:id>', methods=['GET'])
def edit_tutor(id):
      conn = get_db_connection()
      cursor = conn.cursor(dictionary=True)

      #Get existing tutorinfo
      cursor.execute("""SELECT 
            u.userId, 
            u.userName, 
            u.passwordHash, 
            t.tutorId,
            t.name, 
            t.birthday, 
            t.isAdmin,
            t.subjects,
            t.availability
            FROM User u 
            JOIN Tutor t ON u.userId = t.tutorId 
            WHERE t.tutorId = %s""", (id,))
           
      tutor = cursor.fetchone()
      cursor.close()
      conn.close()

      if not tutor:
            return jsonify({"message": "tutor not found"}), 404
      
      if tutor['birthday']:
            tutor['birthday'] = tutor['birthday'].strftime("%Y-%m-%d")

      return jsonify(tutor)
          
@app.route('/api/tutors/<int:id>', methods=['PUT'])
def update_tutor(id):
      data = request.get_json()
      conn = get_db_connection()
      cursor = conn.cursor()

      try:
        # Update User table
            cursor.execute("""
                  UPDATE User 
                  SET userName = %s, 
                  passwordHash = %s
                  WHERE userId = %s
            """, (data['userName'], data['passwordHash'], id))

            # Update tutor table
            cursor.execute("""
                  UPDATE Tutor
                        SET name = %s, 
                        birthday = %s, 
                        isAdmin = %s,
                        subjects = %s,
                        availability = %s
                  WHERE tutorId = %s """, (
                  data['name'], 
                  data['birthday'], 
                  data['isAdmin'],
                  data['subjects'],
                  data['availability'], id
            ))

            conn.commit()
            return jsonify({"message": "tutor updated"})
       
      except Exception as e:
            conn.rollback()
            raise e

      finally:
            cursor.close()
            conn.close()

# SESSION ROUTES

@app.route('/api/sessions', methods=['GET'])
def get_sessions():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute(
        'SELECT sessionId, tutorId, studentId, subjects, startDateTime, endDateTime, location, notes FROM Session'
    )
    sessions = cursor.fetchall()

    cursor.close()
    conn.close()

    return jsonify(sessions)

@app.route('/api/sessions', methods=['POST'])
def add_session():
    data = request.get_json()

    try: 
        start = datetime.strptime(data['startDateTime'], "%Y-%m-%d %H:%M:%S")
        end = datetime.strptime(data['endDateTime'], "%Y-%m-%d %H:%M:%S")
    except ValueError:
        return jsonify({"message": "Invalid date format. Use YYYY-MM-DD HH:MM:SS"}), 400
    
    if start.hour < 8 or end.hour > 20 or (end.hour == 20 and end.minute > 0):
        return jsonify({"message": "Sessions must be between 8 AM and 8 PM"}), 400

    if start.minute not in [0, 30] or end.minute not in [0, 30]:
        return jsonify({"message": "Sessions must start and end on 30-minute intervals"}), 400

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    try:
        cursor.execute("""
        SELECT * FROM Session
        WHERE tutorId = %s
        AND startDateTime < %s
        AND endDateTime > %s
        """, (data['tutorId'], data['endDateTime'], data['startDateTime']))

        if cursor.fetchone():
         return jsonify({"message": "Tutor already has a session during this time"}), 409

        cursor.execute("""
        INSERT INTO Session (tutorId, studentId, subjects, startDateTime, endDateTime, location, notes)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
        """, (
        data['tutorId'],
        data['studentId'],
        data['subjects'],
        data['startDateTime'],
        data['endDateTime'],
        data['location'],
        data.get('notes', '')))
        
        session_id = cursor.lastrowid
        
        if data.get('studentId'):
            cursor.execute("""
            INSERT IGNORE INTO SessionReport (sessionId, studentId)
            VALUES (%s, %s)
            """, (session_id, data['studentId']))
            
        conn.commit()
        return jsonify({"message": "session added", "sessionId": session_id})

    except Exception as e:
        conn.rollback()
        print(f"Error adding session: {e}   ")
        return jsonify({"message": "Error adding session"}), 500

    finally:
        cursor.close()
        conn.close()

@app.route('/api/sessions/<int:id>', methods=['PUT'])
def update_session(id):
    data = request.get_json()
    start = datetime.strptime(data['startDateTime'], "%Y-%m-%d %H:%M:%S")
    end = datetime.strptime(data['endDateTime'], "%Y-%m-%d %H:%M:%S")

    if start.hour < 8 or end.hour > 20 or (end.hour == 20 and end.minute > 0):
        return jsonify({"message": "Sessions must be between 8 AM and 8 PM"}), 400

    if start.minute not in [0, 30] or end.minute not in [0, 30]:
        return jsonify({"message": "Sessions must start and end on 30-minute intervals"}), 400

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
    SELECT * FROM Session
    WHERE tutorId = %s
    AND sessionId != %s
    AND startDateTime < %s
    AND endDateTime > %s
    """, (data['tutorId'], id, data['endDateTime'], data['startDateTime']))

    overlap = cursor.fetchone()

    if overlap:
        cursor.close()
        conn.close()
        return jsonify({"message": "Tutor already has a session during this time"}), 409

    cursor.execute("""
    UPDATE Session
    SET tutorId = %s,
        studentId = %s,
        subjects = %s,
        startDateTime = %s,
        endDateTime = %s,
        location = %s,
        notes = %s
    WHERE sessionId = %s
    """, (
        data['tutorId'],
        data['studentId'],
        data['subjects'],
        data['startDateTime'],
        data['endDateTime'],
        data['location'],
        data.get('notes', ''),
        id
    ))

    cursor.execute('DELETE FROM SessionReport WHERE sessionId = %s', (id,))

    if data.get('studentId'):
        cursor.execute("""
        INSERT INTO SessionReport (sessionId, studentId)
        VALUES (%s, %s)
        """, (id, data['studentId']))

    conn.commit()

    cursor.close()
    conn.close()

    return jsonify({"message": "session updated"})

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

# DASHBOARD STATS ROUTE

@app.route('/api/dashboard-stats/<int:userId>/<string:role>')
def get_dashboard_stats(userId, role):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    stats = {}

    try:
        if role == 'admin':
            cursor.execute('SELECT COUNT(*) AS total FROM Student')
            stats['totalStudents'] = cursor.fetchone()['total']

            cursor.execute('SELECT COUNT(*) AS total FROM Tutor')
            stats['totalTutors'] = cursor.fetchone()['total']

            cursor.execute('SELECT COUNT(*) AS total FROM Session')
            stats['totalSessions'] = cursor.fetchone()['total']

            cursor.execute("""
            SELECT s.sessionId, s.subjects, s.startDateTime, s.endDateTime, s.location,
            t.name AS tutorName, st.name AS studentName
            FROM Session s
            LEFT JOIN Tutor t ON s.tutorId = t.tutorId
            LEFT JOIN SessionReport sr ON s.sessionId = sr.sessionId
            LEFT JOIN Student st ON sr.studentId = st.studentId
            WHERE s.startDateTime > NOW()
            ORDER BY s.startDateTime ASC
            LIMIT 5
            """)
            stats['upcomingSessions'] = cursor.fetchall()

        elif role == 'tutor':
            cursor.execute('SELECT COUNT(*) AS total FROM Session WHERE tutorId = %s', (userId,))
            stats['totalSessions'] = cursor.fetchone()['total']

            cursor.execute("""
            SELECT s.sessionId, s.subjects, s.startDateTime, s.endDateTime, s.location,
            st.name AS studentName
            FROM Session s
            LEFT JOIN SessionReport sr ON s.sessionId = sr.sessionId
            LEFT JOIN Student st ON sr.studentId = st.studentId
            WHERE s.tutorId = %s AND s.startDateTime > NOW()
            ORDER BY s.startDateTime ASC
            LIMIT 5
            """, (userId,))
            stats['upcomingSessions'] = cursor.fetchall()

            cursor.execute("""
            SELECT COUNT(DISTINCT sr.studentId) AS total
            FROM SessionReport sr
            JOIN Session s ON sr.sessionId = s.sessionId
            WHERE s.tutorId = %s
            """, (userId,))
            stats['totalStudents'] = cursor.fetchone()['total']

        elif role == 'student':
            cursor.execute('SELECT COUNT(*) AS total FROM SessionReport WHERE studentId = %s', (userId,))
            stats['totalSessions'] = cursor.fetchone()['total']

            cursor.execute("""
            SELECT s.sessionId, s.subjects, s.startDateTime, s.endDateTime, s.location,
            t.name AS tutorName
            FROM Session s
            JOIN SessionReport sr ON s.sessionId = sr.sessionId
            JOIN Tutor t ON s.tutorId = t.tutorId
            WHERE sr.studentId = %s AND s.startDateTime > NOW()
            ORDER BY s.startDateTime ASC
            LIMIT 5
            """, (userId,))
            stats['upcomingSessions'] = cursor.fetchall()

            cursor.execute("""
            SELECT COUNT(DISTINCT s.subjects) AS total
            FROM Session s
            JOIN SessionReport ss ON s.sessionId = ss.sessionId
            WHERE ss.studentId = %s
            """, (userId,))
            stats['totalSubjects'] = cursor.fetchone()['total']

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