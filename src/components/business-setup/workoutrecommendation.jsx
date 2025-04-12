// WorkoutRecommendations.jsx
import { useState, useEffect } from "react";
import "./Workoutrecommendation.css";

export function WorkoutRecommendations({ userData }) {
  const [goal, setGoal] = useState("strength");
  const [bmiCategory, setBmiCategory] = useState("");

  useEffect(() => {
    if (userData && userData.weight && userData.height) {
      // Calculate BMI
      const heightInMeters = userData.height / 100;
      const bmiValue = userData.weight / (heightInMeters * heightInMeters);

      // Set BMI category
      if (bmiValue < 18.5) {
        setBmiCategory("underweight");
      } else if (bmiValue >= 18.5 && bmiValue < 25) {
        setBmiCategory("healthy");
      } else if (bmiValue >= 25 && bmiValue < 30) {
        setBmiCategory("overweight");
      } else {
        setBmiCategory("obese");
      }
    }
  }, [userData]);

  const workouts = {
    strength: [
      {
        title: "Upper Body Power",
        description: "Focus on chest, shoulders, and arms",
        level: "Intermediate",
        duration: "45 min",
        exercises: [
          { name: "Bench Press", sets: "4 sets x 8 reps" },
          { name: "Shoulder Press", sets: "3 sets x 10 reps" },
          { name: "Bent-Over Rows", sets: "3 sets x 10 reps" },
          { name: "Tricep Extensions", sets: "3 sets x 12 reps" },
          { name: "Bicep Curls", sets: "3 sets x 12 reps" },
        ],
      },
      {
        title: "Lower Body Strength",
        description: "Focus on legs and glutes",
        level: "Advanced",
        duration: "50 min",
        exercises: [
          { name: "Squats", sets: "4 sets x 8 reps" },
          { name: "Deadlifts", sets: "4 sets x 6 reps" },
          { name: "Leg Press", sets: "3 sets x 10 reps" },
          { name: "Walking Lunges", sets: "3 sets x 12 steps" },
          { name: "Calf Raises", sets: "3 sets x 15 reps" },
        ],
      },
      {
        title: "Full Body Strength",
        description: "Comprehensive full body workout",
        level: "Intermediate",
        duration: "60 min",
        exercises: [
          { name: "Deadlifts", sets: "3 sets x 8 reps" },
          { name: "Push-ups", sets: "3 sets x 12 reps" },
          { name: "Pull-ups", sets: "3 sets x 8 reps" },
          { name: "Goblet Squats", sets: "3 sets x 12 reps" },
          { name: "Plank", sets: "3 sets x 45 sec" },
        ],
      },
    ],
    weightloss: [
      {
        title: "HIIT Cardio",
        description: "High-intensity interval training",
        level: "All Levels",
        duration: "30 min",
        exercises: [
          { name: "Jumping Jacks", sets: "45 sec on, 15 sec rest" },
          { name: "Mountain Climbers", sets: "45 sec on, 15 sec rest" },
          { name: "Burpees", sets: "45 sec on, 15 sec rest" },
          { name: "High Knees", sets: "45 sec on, 15 sec rest" },
          { name: "Plank Jacks", sets: "45 sec on, 15 sec rest" },
        ],
      },
      {
        title: "Fat Burning Circuit",
        description: "Full body circuit for maximum calorie burn",
        level: "Intermediate",
        duration: "40 min",
        exercises: [
          { name: "Kettlebell Swings", sets: "3 sets x 15 reps" },
          { name: "Jump Squats", sets: "3 sets x 12 reps" },
          { name: "Push-up to Renegade Row", sets: "3 sets x 10 reps" },
          { name: "Lateral Lunges", sets: "3 sets x 12 each side" },
          { name: "Bicycle Crunches", sets: "3 sets x 20 reps" },
        ],
      },
      {
        title: "Metabolic Conditioning",
        description: "Boost metabolism and burn fat",
        level: "Advanced",
        duration: "45 min",
        exercises: [
          { name: "Box Jumps", sets: "4 sets x 12 reps" },
          { name: "Battle Ropes", sets: "4 sets x 30 sec" },
          { name: "Sled Push", sets: "4 sets x 30 meters" },
          { name: "Medicine Ball Slams", sets: "4 sets x 15 reps" },
          { name: "Rowing Machine", sets: "4 sets x 250 meters" },
        ],
      },
    ],
    flexibility: [
      {
        title: "Dynamic Stretching",
        description: "Improve range of motion",
        level: "All Levels",
        duration: "25 min",
        exercises: [
          { name: "Arm Circles", sets: "2 sets x 30 sec each direction" },
          { name: "Leg Swings", sets: "2 sets x 12 each leg" },
          { name: "Hip Circles", sets: "2 sets x 10 each direction" },
          { name: "Walking Lunges with Twist", sets: "2 sets x 10 each side" },
          { name: "World's Greatest Stretch", sets: "2 sets x 8 each side" },
        ],
      },
      {
        title: "Yoga Flow",
        description: "Enhance flexibility and balance",
        level: "Intermediate",
        duration: "40 min",
        exercises: [
          { name: "Sun Salutations", sets: "5 complete flows" },
          { name: "Warrior Sequence", sets: "Hold each pose for 30 sec" },
          { name: "Standing Balances", sets: "Hold each pose for 30 sec" },
          { name: "Seated Forward Folds", sets: "Hold each pose for 45 sec" },
          { name: "Supine Twists", sets: "Hold each pose for 45 sec" },
        ],
      },
      {
        title: "Mobility Workout",
        description: "Joint mobility and flexibility",
        level: "All Levels",
        duration: "35 min",
        exercises: [
          { name: "Shoulder Mobility Series", sets: "2 sets x 10 reps each" },
          { name: "Hip Mobility Series", sets: "2 sets x 10 reps each" },
          { name: "Ankle Mobility Drills", sets: "2 sets x 10 reps each" },
          { name: "Thoracic Spine Rotations", sets: "2 sets x 8 each side" },
          { name: "Wrist Mobility Series", sets: "2 sets x 10 reps each" },
        ],
      },
    ],
  };

  return (
    <div className="workout-recommendations">
      <div className="header">
        <div className="header-text">
          <h2>Workout Recommendations</h2>
          <p>Personalized workout plans based on your goals and fitness level</p>
        </div>
        <div className="goal-buttons">
          <button
            onClick={() => setGoal("strength")}
            className={`goal-button ${goal === "strength" ? "active" : ""}`}
          >
            Strength
          </button>
          <button
            onClick={() => setGoal("weightloss")}
            className={`goal-button ${goal === "weightloss" ? "active" : ""}`}
          >
            Weight Loss
          </button>
          <button
            onClick={() => setGoal("flexibility")}
            className={`goal-button ${goal === "flexibility" ? "active" : ""}`}
          >
            Flexibility
          </button>
        </div>
      </div>

      <div className="search-filter">
        <div className="search-container">
          <div className="search-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <input
            type="search"
            placeholder="Search workouts..."
            className="search-input"
          />
        </div>
        <button className="filter-button">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 4H21M3 12H21M3 20H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Filter
        </button>
      </div>

      <div className="workout-cards">
        {workouts[goal].map((workout, index) => (
          <div key={index} className="workout-card">
            <div className="card-highlight-bar"></div>
            <div className="card-header">
              <h3>{workout.title}</h3>
              <p>{workout.description}</p>
            </div>
            <div className="card-content">
              <div className="workout-meta">
                <div className="workout-level">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6V12M6 18V12M12 2V22M18 12C20.2091 12 22 10.2091 22 8C22 5.79086 20.2091 4 18 4C15.7909 4 14 5.79086 14 8C14 10.2091 15.7909 12 18 12ZM6 12C8.20914 12 10 13.7909 10 16C10 18.2091 8.20914 20 6 20C3.79086 20 2 18.2091 2 16C2 13.7909 3.79086 12 6 12Z" stroke="rgb(24,239,199)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>{workout.level}</span>
                </div>
                <div className="workout-duration">
                  <span>{workout.duration}</span>
                </div>
              </div>
              <div className="exercise-list">
                {workout.exercises.map((exercise, i) => (
                  <div key={i} className="exercise-item">
                    <span className="exercise-name">{exercise.name}</span>
                    <span className="exercise-sets">{exercise.sets}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="card-footer">
              <button className="start-button">Start Workout</button>
            </div>
          </div>
        ))}
      </div>

      {bmiCategory && (
        <div className="bmi-card">
          <div className="bmi-header">
            <h3>Recommendations Based on Your BMI</h3>
            <p>Personalized suggestions for your body type</p>
          </div>
          <div className="bmi-content">
            {bmiCategory === "underweight" && (
              <div className="bmi-recommendations">
                <p>
                  Based on your BMI, you're classified as{" "}
                  <span className="highlight">underweight</span>. Here are some recommendations:
                </p>
                <ul className="recommendations-list">
                  <li>Focus on strength training to build muscle mass</li>
                  <li>Increase caloric intake with nutrient-dense foods</li>
                  <li>Include protein with every meal to support muscle growth</li>
                  <li>Start with lighter weights and focus on proper form</li>
                </ul>
              </div>
            )}

            {bmiCategory === "healthy" && (
              <div className="bmi-recommendations">
                <p>
                  Based on your BMI, you're classified as having a{" "}
                  <span className="highlight">healthy weight</span>. Here are some recommendations:
                </p>
                <ul className="recommendations-list">
                  <li>Maintain a balanced approach to fitness with both cardio and strength training</li>
                  <li>Focus on performance goals rather than weight loss</li>
                  <li>Consider adding variety to your workouts to prevent plateaus</li>
                  <li>Maintain a balanced diet that supports your activity level</li>
                </ul>
              </div>
            )}

            {bmiCategory === "overweight" && (
              <div className="bmi-recommendations">
                <p>
                  Based on your BMI, you're classified as{" "}
                  <span className="highlight">overweight</span>. Here are some recommendations:
                </p>
                <ul className="recommendations-list">
                  <li>Combine strength training with cardio for optimal fat loss</li>
                  <li>Focus on HIIT workouts for efficient calorie burning</li>
                  <li>Start with lower impact exercises to protect joints</li>
                  <li>Create a moderate calorie deficit through diet and exercise</li>
                </ul>
              </div>
            )}

            {bmiCategory === "obese" && (
              <div className="bmi-recommendations">
                <p>
                  Based on your BMI, you're classified as{" "}
                  <span className="highlight">obese</span>. Here are some recommendations:
                </p>
                <ul className="recommendations-list">
                  <li>Start with low-impact exercises like walking, swimming, or cycling</li>
                  <li>Focus on building consistency with shorter, more frequent workouts</li>
                  <li>Include resistance training to preserve muscle mass during weight loss</li>
                  <li>Consider working with a fitness professional for personalized guidance</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}