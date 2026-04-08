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
        cursor.execute("""INSERT INTO User (username, passwordHash, role) VALUES (%s, %s, %s)""", 
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

        cursor.execute('DELETE FROM Student WHERE id = %s', (id,))
        conn.commit()

        cursor.close()
        conn.close()

        return jsonify({"message": "student deleted"})

if __name__ == '__main__':
    app.run(debug=True)
