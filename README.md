# SmartChatBot

## Currently working on this project.

>  💡 **Upon successful completion and testing, we will deploy this application.**
---
SmartChatBot is a **real-time chat application** that allows users to **register, log in, start conversations with other registered users, and customize their profiles**. It is built using modern web technologies, ensuring **fast performance and smooth real-time communication**.

## ⚙ Tech Stack

### **Frontend:**
- JavaScript
- React.js
- Tailwind CSS
- Vite
- axios
- dayjs
- jwt-decode
- moment
- react-icons
- sweetalert2

### **Backend:**
- Python
- Django
- Django Rest Framework (DRF)
- Django Channels
- Simple JWT (for authentication)
- Redis (for caching real-time messages)
- SQLite3 (for database management)

## ⚡ Features
- **User Authentication:** Register, login, and logout functionality using JWT.
- **Real-time Messaging:** Chat instantly with registered users using WebSockets.
- **Profile Management:** Customize and update user profile details.
- **Chat History:** Messages are cached in Redis and stored in SQLite3.
- **Fast & Responsive UI:** Built with React.js and Tailwind CSS for a smooth experience.

## 📂 Project Structure
```bash
Smart_Chat/
│── backend/    # Django backend with API & WebSocket integration
│── frontend/   # React frontend for user interface
│── README.md   # Documentation
```

## 🔗 GitHub Repository
[SmartChatBot GitHub Repo](https://github.com/vijay-jadhav1997/smart_chat.git)

## 🛠️ Installation & Setup
### **1. Clone the Repository**
```bash
git clone https://github.com/vijay-jadhav1997/smart_chat.git
cd smart_chat
```
### **2. Backend Setup**
```bash
cd backend
python -m venv venv  # Create a virtual environment
source venv/bin/activate  # Activate virtual environment (Mac/Linux)
venv\Scripts\activate  # Activate virtual environment (Windows)
pip install -r requirements.txt  # Install dependencies
# Create/copy (.env-example file) to .env file and set all the environment variables.
python manage.py makemigrations  # Apply database migrations
python manage.py migrate  # Apply database migrations
python manage.py runserver  # Start backend server
```
### **3. Frontend Setup**
```bash
cd frontend
npm install  # Install dependencies
npm run dev  # Start frontend server
```

## 🎯 Future Improvements
- Implementing group chat functionality.
- Enhancing UI with more interactive features.
- Adding notifications for real-time chat updates.
- Implementing audio/video calling functionality.

##  Contact
If you have any questions, feel free to reach out or raise an issue in the repository.

You can also contact me here - [LinkedIn](https://www.linkedin.com/in/vijay-jadhav1997)

---
**Happy Coding! 🚀**
