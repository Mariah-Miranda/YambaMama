# YambaMama

**YambaMama** is a dedicated maternal health companion designed specifically for pregnant mothers in Uganda. It combines local health wisdom with advanced AI to provide personalized support, health tracking, and immediate guidance throughout the pregnancy journey.

---

##  Overview

Maternal health is a priority, especially in regions where access to immediate medical advice can be limited. YambaMama bridges this gap by acting as a "Mama in your pocket," offering:
- **AI-Powered Health Support:** Interactive chat that understands the context of Ugandan maternal health.
- **Bilingual Support:** Full functionality in both **English** and **Luganda**.
- **Localized Nutrition:** Meal plans featuring local Ugandan foods like Nakati, Dodo, and Matooke.

##  Key Features

### 1.  AI Health Companion ("Mama")
- Instant answers to pregnancy-related questions.
- **Risk Assessment:** Real-time analysis of symptoms (LOW, MEDIUM, HIGH, or EMERGENCY risk levels).
- Reassuring, culturally sensitive guidance.

### 2.  Baby Development Tracker
- Visual and descriptive milestones for your baby's growth.
- Weekly updates on baby size (compared to familiar items).
- Educational insights into what's happening at each stage.

### 3.  Personalized Nutrition guide
- AI-generated meal plans tailored to your specific week of pregnancy.
- Focus on locally available Ugandan ingredients for optimal health.

### 4.  Clinic & Visit Management
- **Visit Tracker:** Log your clinical appointments and keep notes on your progress.
- **Clinic Finder:** Find major health centers and clinics based on your district in Uganda.

### 5.  Dual Language Support
- Seamless translation between English and Luganda.
- Accessible interface designed for ease of use.

##  Tech Stack

- **Frontend:** React 19 + TypeScript
- **Styling:** Tailwind CSS (Modern v4 setup)
- **AI Integration:** Google Gemini API (`@google/genai`)
- **Animation:** Motion (Framer Motion)
- **Icons:** Lucide React
- **Build Tool:** Vite

##  Setup & Installation

### Prerequisites
- Node.js (Latest LTS recommended)
- A Google Gemini API Key

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/yamba-mama.git
   cd yamba-mama
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory and add your Gemini API Key:
   ```env
   GEMINI_API_KEY=your_actual_api_key_here
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

---

##  Privacy & Safety
YambaMama is designed as a *support tool* and not a replacement for professional medical advice. Always consult with a qualified health professional for medical emergencies or specific health concerns. The platform respects user privacy and aims to provide a safe space for health inquiries.

##  License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

*Made with love for the mothers of Uganda.*
