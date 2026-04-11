from flask import Flask, request, jsonify
from flask_cors import CORS
from db import get_db_connection

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

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
        cursor.execute("""INSERT INTO User (userName, passwordHash, role) VALUES (%s, %s, %s)""", 
        (data['userName'], data['passwordHash'], 'student'))

        user_id = cursor.lastrowid

        # create a student using the created user above
        cursor.execute("""INSERT INTO Student (studentId, name, birthday, grade, school, location, parentName, parentPhone, parentEmail) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)""", 
        (user_id, data['name'], data['birthday'], data['grade'], data['school'], data['location'], data['parentName'], data['parentPhone'], data['parentEmail']))
        
        conn.commit()
        cursor.close()
        conn.close()
        
        return jsonify({"message": "student added", "studentId": user_id})

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

      # create user
      cursor.execute("""INSERT INTO User (userName, passwordHash, role) VALUES (%s, %s, %s)""", 
      (data['userName'], data['passwordHash'], 'tutor'))

      user_id = cursor.lastrowid

      # create a tutor 
      cursor.execute("""INSERT INTO Tutor (tutorId, name, isAdmin, birthday, subjects, availability) VALUES (%s, %s, %s, %s, %s, %s)""", 
      (user_id, data['name'], data.get('isAdmin', False), data['birthday'], data['subjects'], data['availability']))
      
      conn.commit()
      cursor.close()
      conn.close()
      
      return jsonify({"message": "tutor added", "tutorId": user_id})

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

if __name__ == '__main__':
    app.run(debug=True)
