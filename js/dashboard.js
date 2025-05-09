document.addEventListener('DOMContentLoaded', function() {
    const userRole = localStorage.getItem('userRole');
    
    // Show the appropriate dashboard based on user role
    if (userRole) {
        document.getElementById(`${userRole}-dashboard`).style.display = 'block';
        document.getElementById('role-description').textContent = getRoleDescription(userRole);
        
        // Load dashboard data
        loadDashboardData(userRole);
    }
    
    // Handle grade submission for teachers
    const gradeForm = document.getElementById('grade-form');
    if (gradeForm) {
        gradeForm.addEventListener('submit', handleGradeSubmission);
    }
});

function getRoleDescription(role) {
    const descriptions = {
        teacher: 'Teacher - Manage your classes and enter student grades',
        student: 'Student - View your courses, grades, and school notices',
        parent: 'Parent - Monitor your child\'s progress and school communications'
    };
    return descriptions[role] || '';
}

async function loadDashboardData(role) {
    try {
        // In a real app, these would be API calls to your backend
        // const response = await fetch(`/api/${role}/dashboard`, {
        //     headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }
        // });
        // const data = await response.json();
        
        // Mock data for demo purposes
        let data = {};
        
        if (role === 'teacher') {
            data = {
                classes: [
                    { id: 'math101', name: 'Mathematics 101', students: 25 },
                    { id: 'eng201', name: 'English Literature 201', students: 18 }
                ]
            };
            
            // Populate teacher classes
            const teacherClasses = document.getElementById('teacher-classes');
            teacherClasses.innerHTML = data.classes.map(cls => 
                `<div class="class-item">
                    <h5>${cls.name}</h5>
                    <p>Students: ${cls.students}</p>
                </div>`
            ).join('');
            
            // Populate grade form dropdowns
            const gradeClassSelect = document.getElementById('grade-class');
            gradeClassSelect.innerHTML = data.classes.map(cls => 
                `<option value="${cls.id}">${cls.name}</option>`
            ).join('');
            
            // Mock students for selected class
            updateStudentDropdown('math101');
            
            // Add event listener for class change
            gradeClassSelect.addEventListener('change', (e) => {
                updateStudentDropdown(e.target.value);
            });
            
        } else if (role === 'student') {
            data = {
                grades: [
                    { course: 'Mathematics 101', assignment: 'Algebra Test', score: 88, date: '2023-10-15' },
                    { course: 'English Literature 201', assignment: 'Essay', score: 92, date: '2023-10-10' }
                ],
                schedule: [
                    { day: 'Monday', time: '9:00 AM', course: 'Mathematics 101', room: 'Room 201' },
                    { day: 'Tuesday', time: '10:30 AM', course: 'English Literature 201', room: 'Room 105' }
                ]
            };
            
            // Populate student grades
            const studentGrades = document.getElementById('student-grades');
            studentGrades.innerHTML = `
                <table>
                    <thead>
                        <tr>
                            <th>Course</th>
                            <th>Assignment</th>
                            <th>Score</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${data.grades.map(grade => `
                            <tr>
                                <td>${grade.course}</td>
                                <td>${grade.assignment}</td>
                                <td>${grade.score}</td>
                                <td>${grade.date}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
            
            // Populate student schedule
            const studentSchedule = document.getElementById('student-schedule');
            studentSchedule.innerHTML = `
                <table>
                    <thead>
                        <tr>
                            <th>Day</th>
                            <th>Time</th>
                            <th>Course</th>
                            <th>Room</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${data.schedule.map(item => `
                            <tr>
                                <td>${item.day}</td>
                                <td>${item.time}</td>
                                <td>${item.course}</td>
                                <td>${item.room}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
            
        } else if (role === 'parent') {
            data = {
                children: [
                    { id: 'stu123', name: 'John Doe', grade: '10th Grade' },
                    { id: 'stu124', name: 'Jane Doe', grade: '8th Grade' }
                ],
                grades: [
                    { child: 'John Doe', course: 'Mathematics 101', assignment: 'Algebra Test', score: 88 },
                    { child: 'John Doe', course: 'English Literature 201', assignment: 'Essay', score: 92 },
                    { child: 'Jane Doe', course: 'Science 101', assignment: 'Lab Report', score: 95 }
                ]
            };
            
            // Populate parent's children
            const parentChildren = document.getElementById('parent-children');
            parentChildren.innerHTML = data.children.map(child => `
                <div class="child-item">
                    <h5>${child.name}</h5>
                    <p>${child.grade}</p>
                </div>
            `).join('');
            
            // Populate children's grades
            const childrenGrades = document.getElementById('children-grades');
            childrenGrades.innerHTML = `
                <table>
                    <thead>
                        <tr>
                            <th>Child</th>
                            <th>Course</th>
                            <th>Assignment</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${data.grades.map(grade => `
                            <tr>
                                <td>${grade.child}</td>
                                <td>${grade.course}</td>
                                <td>${grade.assignment}</td>
                                <td>${grade.score}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
        }
    } catch (error) {
        console.error('Error loading dashboard data:', error);
        alert('Failed to load dashboard data. Please try again later.');
    }
}

function updateStudentDropdown(classId) {
    // Mock students - in a real app, this would come from an API
    const students = {
        math101: [
            { id: 'stu123', name: 'John Doe' },
            { id: 'stu124', name: 'Jane Smith' },
            { id: 'stu125', name: 'Michael Johnson' }
        ],
        eng201: [
            { id: 'stu123', name: 'John Doe' },
            { id: 'stu126', name: 'Emily Davis' },
            { id: 'stu127', name: 'Robert Wilson' }
        ]
    };
    
    const gradeStudentSelect = document.getElementById('grade-student');
    gradeStudentSelect.innerHTML = students[classId].map(student => 
        `<option value="${student.id}">${student.name}</option>`
    ).join('');
}

async function handleGradeSubmission(e) {
    e.preventDefault();
    
    const classId = document.getElementById('grade-class').value;
    const studentId = document.getElementById('grade-student').value;
    const assignment = document.getElementById('grade-assignment').value;
    const score = document.getElementById('grade-score').value;
    
    try {
        // In a real app, this would be an API call to your backend
        // const response = await fetch('/api/grades', {
        //     method: 'POST',
        //     headers: { 
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        //     },
        //     body: JSON.stringify({ classId, studentId, assignment, score })
        // });
        
        // Mock success response
        alert('Grade submitted successfully!');
        document.getElementById('grade-form').reset();
    } catch (error) {
        console.error('Error submitting grade:', error);
        alert('Failed to submit grade. Please try again.');
    }
}