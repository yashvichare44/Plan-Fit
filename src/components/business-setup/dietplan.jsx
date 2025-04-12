import { useState } from "react";
import { Edit, Plus, ChevronDown, ChevronUp } from "lucide-react";
import './dietplan.css';

export function DietPlanCard() {
  const [activeTab, setActiveTab] = useState("week1");
  const [expandedMeals, setExpandedMeals] = useState({});

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const toggleMealExpansion = (dayMealId) => {
    setExpandedMeals(prev => ({
      ...prev,
      [dayMealId]: !prev[dayMealId]
    }));
  };

  return (
    <div className="diet-card">
      <div className="card-header">
        <div className="header-content">
          <div>
            <h2 className="card-title">Current Diet Plan</h2>
            <p className="card-description">Your personalized 4-week nutrition plan</p>
          </div>
          <div className="button-group">
            <button className="btn-outline">
              <Edit size={16} />
              <span>Edit Plan</span>
            </button>
            <button className="btn-primary">
              <Plus size={16} />
              <span>New Plan</span>
            </button>
          </div>
        </div>
      </div>
      <div className="card-content">
        <div className="tabs">
          <div className="tabs-list">
            <button 
              className={`tab-trigger ${activeTab === "week1" ? "active" : ""}`}
              onClick={() => handleTabChange("week1")}
            >
              Week 1
            </button>
            <button 
              className={`tab-trigger ${activeTab === "week2" ? "active" : ""}`}
              onClick={() => handleTabChange("week2")}
            >
              Week 2
            </button>
            <button 
              className={`tab-trigger ${activeTab === "week3" ? "active" : ""}`}
              onClick={() => handleTabChange("week3")}
            >
              Week 3
            </button>
            <button 
              className={`tab-trigger ${activeTab === "week4" ? "active" : ""}`}
              onClick={() => handleTabChange("week4")}
            >
              Week 4
            </button>
          </div>
          
          {activeTab === "week1" && (
            <div className="tab-content">
              <div className="diet-grid">
                <div className="day-card">
                  <div className="day-header">
                    <h3 className="day-title">Monday</h3>
                    <div className="badge-container">
                      <span className="badge-primary">High Protein</span>
                      <span className="badge-outline">2100 cal</span>
                    </div>
                  </div>
                  <div className="day-content">
                    <div className="meal-list">
                      <div className="meal-item">
                        <div 
                          className="meal-header" 
                          onClick={() => toggleMealExpansion("monday-breakfast")}
                        >
                          <div className="meal-title">
                            <span className="meal-name">Breakfast</span>
                            <span className="meal-time">7:00 AM</span>
                          </div>
                          <button className="expand-button">
                            {expandedMeals["monday-breakfast"] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          </button>
                        </div>
                        {expandedMeals["monday-breakfast"] && (
                          <div className="meal-details">
                            <div className="food-item">
                              <span>Protein Oatmeal</span>
                              <span>350 cal</span>
                            </div>
                            <ul className="ingredients-list">
                              <li>1/2 cup rolled oats</li>
                              <li>1 scoop protein powder</li>
                              <li>1 tbsp almond butter</li>
                              <li>1/2 banana, sliced</li>
                              <li>1 tsp honey</li>
                              <li>Cinnamon to taste</li>
                            </ul>
                            <div className="nutrition-info">
                              <div className="nutrition-item">
                                <span>Protein</span>
                                <span>28g</span>
                              </div>
                              <div className="nutrition-item">
                                <span>Carbs</span>
                                <span>42g</span>
                              </div>
                              <div className="nutrition-item">
                                <span>Fat</span>
                                <span>10g</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="meal-item">
                        <div 
                          className="meal-header" 
                          onClick={() => toggleMealExpansion("monday-snack1")}
                        >
                          <div className="meal-title">
                            <span className="meal-name">Mid-morning Snack</span>
                            <span className="meal-time">10:30 AM</span>
                          </div>
                          <button className="expand-button">
                            {expandedMeals["monday-snack1"] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          </button>
                        </div>
                        {expandedMeals["monday-snack1"] && (
                          <div className="meal-details">
                            <div className="food-item">
                              <span>Greek Yogurt with Berries</span>
                              <span>200 cal</span>
                            </div>
                            <ul className="ingredients-list">
                              <li>1 cup Greek yogurt (0% fat)</li>
                              <li>1/2 cup mixed berries</li>
                              <li>1 tbsp honey</li>
                            </ul>
                            <div className="nutrition-info">
                              <div className="nutrition-item">
                                <span>Protein</span>
                                <span>22g</span>
                              </div>
                              <div className="nutrition-item">
                                <span>Carbs</span>
                                <span>24g</span>
                              </div>
                              <div className="nutrition-item">
                                <span>Fat</span>
                                <span>0g</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="meal-item">
                        <div 
                          className="meal-header" 
                          onClick={() => toggleMealExpansion("monday-lunch")}
                        >
                          <div className="meal-title">
                            <span className="meal-name">Lunch</span>
                            <span className="meal-time">1:00 PM</span>
                          </div>
                          <button className="expand-button">
                            {expandedMeals["monday-lunch"] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          </button>
                        </div>
                        {expandedMeals["monday-lunch"] && (
                          <div className="meal-details">
                            <div className="food-item">
                              <span>Chicken Quinoa Bowl</span>
                              <span>550 cal</span>
                            </div>
                            <ul className="ingredients-list">
                              <li>4 oz grilled chicken breast</li>
                              <li>1/2 cup cooked quinoa</li>
                              <li>1 cup mixed vegetables</li>
                              <li>1/4 avocado</li>
                              <li>1 tbsp olive oil</li>
                              <li>Lemon juice, salt, and herbs to taste</li>
                            </ul>
                            <div className="nutrition-info">
                              <div className="nutrition-item">
                                <span>Protein</span>
                                <span>40g</span>
                              </div>
                              <div className="nutrition-item">
                                <span>Carbs</span>
                                <span>45g</span>
                              </div>
                              <div className="nutrition-item">
                                <span>Fat</span>
                                <span>20g</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="meal-item">
                        <div 
                          className="meal-header" 
                          onClick={() => toggleMealExpansion("monday-snack2")}
                        >
                          <div className="meal-title">
                            <span className="meal-name">Afternoon Snack</span>
                            <span className="meal-time">4:00 PM</span>
                          </div>
                          <button className="expand-button">
                            {expandedMeals["monday-snack2"] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          </button>
                        </div>
                        {expandedMeals["monday-snack2"] && (
                          <div className="meal-details">
                            <div className="food-item">
                              <span>Protein Shake</span>
                              <span>250 cal</span>
                            </div>
                            <ul className="ingredients-list">
                              <li>1 scoop protein powder</li>
                              <li>1 cup almond milk</li>
                              <li>1/2 banana</li>
                              <li>1 tbsp peanut butter</li>
                              <li>Ice cubes</li>
                            </ul>
                            <div className="nutrition-info">
                              <div className="nutrition-item">
                                <span>Protein</span>
                                <span>25g</span>
                              </div>
                              <div className="nutrition-item">
                                <span>Carbs</span>
                                <span>20g</span>
                              </div>
                              <div className="nutrition-item">
                                <span>Fat</span>
                                <span>9g</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="meal-item">
                        <div 
                          className="meal-header" 
                          onClick={() => toggleMealExpansion("monday-dinner")}
                        >
                          <div className="meal-title">
                            <span className="meal-name">Dinner</span>
                            <span className="meal-time">7:30 PM</span>
                          </div>
                          <button className="expand-button">
                            {expandedMeals["monday-dinner"] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          </button>
                        </div>
                        {expandedMeals["monday-dinner"] && (
                          <div className="meal-details">
                            <div className="food-item">
                              <span>Baked Salmon with Vegetables</span>
                              <span>650 cal</span>
                            </div>
                            <ul className="ingredients-list">
                              <li>5 oz salmon fillet</li>
                              <li>1 cup roasted Brussels sprouts</li>
                              <li>1 medium sweet potato</li>
                              <li>1 tbsp olive oil</li>
                              <li>Garlic, lemon, herbs, and spices to taste</li>
                            </ul>
                            <div className="nutrition-info">
                              <div className="nutrition-item">
                                <span>Protein</span>
                                <span>35g</span>
                              </div>
                              <div className="nutrition-item">
                                <span>Carbs</span>
                                <span>50g</span>
                              </div>
                              <div className="nutrition-item">
                                <span>Fat</span>
                                <span>30g</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="day-footer">
                    <div className="nutrition-summary">
                      <div className="nutrition-total">
                        <span>Total Calories</span>
                        <span>2000</span>
                      </div>
                      <div className="macros-distribution">
                        <div className="macro protein">
                          <span>Protein</span>
                          <span>150g (30%)</span>
                        </div>
                        <div className="macro carbs">
                          <span>Carbs</span>
                          <span>181g (36%)</span>
                        </div>
                        <div className="macro fat">
                          <span>Fat</span>
                          <span>69g (34%)</span>
                        </div>
                      </div>
                    </div>
                    <button className="btn-primary full-width">Log Today's Meals</button>
                  </div>
                </div>

                <div className="day-card">
                  <div className="day-header">
                    <h3 className="day-title">Wednesday</h3>
                    <div className="badge-container">
                      <span className="badge-primary">Recovery Day</span>
                      <span className="badge-outline">2000 cal</span>
                    </div>
                  </div>
                  <div className="day-content">
                    <div className="meal-list">
                      <div className="meal-item">
                        <div 
                          className="meal-header" 
                          onClick={() => toggleMealExpansion("wednesday-breakfast")}
                        >
                          <div className="meal-title">
                            <span className="meal-name">Breakfast</span>
                            <span className="meal-time">7:00 AM</span>
                          </div>
                          <button className="expand-button">
                            {expandedMeals["wednesday-breakfast"] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          </button>
                        </div>
                      </div>
                      
                      <div className="meal-item">
                        <div 
                          className="meal-header" 
                          onClick={() => toggleMealExpansion("wednesday-snack1")}
                        >
                          <div className="meal-title">
                            <span className="meal-name">Mid-morning Snack</span>
                            <span className="meal-time">10:30 AM</span>
                          </div>
                          <button className="expand-button">
                            {expandedMeals["wednesday-snack1"] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          </button>
                        </div>
                      </div>
                      
                      <div className="meal-item">
                        <div 
                          className="meal-header" 
                          onClick={() => toggleMealExpansion("wednesday-lunch")}
                        >
                          <div className="meal-title">
                            <span className="meal-name">Lunch</span>
                            <span className="meal-time">1:00 PM</span>
                          </div>
                          <button className="expand-button">
                            {expandedMeals["wednesday-lunch"] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          </button>
                        </div>
                      </div>
                      
                      <div className="meal-item">
                        <div 
                          className="meal-header" 
                          onClick={() => toggleMealExpansion("wednesday-snack2")}
                        >
                          <div className="meal-title">
                            <span className="meal-name">Afternoon Snack</span>
                            <span className="meal-time">4:00 PM</span>
                          </div>
                          <button className="expand-button">
                            {expandedMeals["wednesday-snack2"] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          </button>
                        </div>
                      </div>
                      
                      <div className="meal-item">
                        <div 
                          className="meal-header" 
                          onClick={() => toggleMealExpansion("wednesday-dinner")}
                        >
                          <div className="meal-title">
                            <span className="meal-name">Dinner</span>
                            <span className="meal-time">7:30 PM</span>
                          </div>
                          <button className="expand-button">
                            {expandedMeals["wednesday-dinner"] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="day-footer">
                    <div className="nutrition-summary">
                      <div className="nutrition-total">
                        <span>Total Calories</span>
                        <span>2000</span>
                      </div>
                      <div className="macros-distribution">
                        <div className="macro protein">
                          <span>Protein</span>
                          <span>140g (28%)</span>
                        </div>
                        <div className="macro carbs">
                          <span>Carbs</span>
                          <span>210g (42%)</span>
                        </div>
                        <div className="macro fat">
                          <span>Fat</span>
                          <span>67g (30%)</span>
                        </div>
                      </div>
                    </div>
                    <button className="btn-primary full-width">Log Today's Meals</button>
                  </div>
                </div>

                <div className="day-card">
                  <div className="day-header">
                    <h3 className="day-title">Friday</h3>
                    <div className="badge-container">
                      <span className="badge-primary">High Energy</span>
                      <span className="badge-outline">2200 cal</span>
                    </div>
                  </div>
                  <div className="day-content">
                    <div className="meal-list">
                      <div className="meal-item">
                        <div 
                          className="meal-header" 
                          onClick={() => toggleMealExpansion("friday-breakfast")}
                        >
                          <div className="meal-title">
                            <span className="meal-name">Breakfast</span>
                            <span className="meal-time">7:00 AM</span>
                          </div>
                          <button className="expand-button">
                            {expandedMeals["friday-breakfast"] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          </button>
                        </div>
                      </div>
                      
                      <div className="meal-item">
                        <div 
                          className="meal-header" 
                          onClick={() => toggleMealExpansion("friday-snack1")}
                        >
                          <div className="meal-title">
                            <span className="meal-name">Mid-morning Snack</span>
                            <span className="meal-time">10:30 AM</span>
                          </div>
                          <button className="expand-button">
                            {expandedMeals["friday-snack1"] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          </button>
                        </div>
                      </div>
                      
                      <div className="meal-item">
                        <div 
                          className="meal-header" 
                          onClick={() => toggleMealExpansion("friday-lunch")}
                        >
                          <div className="meal-title">
                            <span className="meal-name">Lunch</span>
                            <span className="meal-time">1:00 PM</span>
                          </div>
                          <button className="expand-button">
                            {expandedMeals["friday-lunch"] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          </button>
                        </div>
                      </div>
                      
                      <div className="meal-item">
                        <div 
                          className="meal-header" 
                          onClick={() => toggleMealExpansion("friday-snack2")}
                        >
                          <div className="meal-title">
                            <span className="meal-name">Afternoon Snack</span>
                            <span className="meal-time">4:00 PM</span>
                          </div>
                          <button className="expand-button">
                            {expandedMeals["friday-snack2"] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          </button>
                        </div>
                      </div>
                      
                      <div className="meal-item">
                        <div 
                          className="meal-header" 
                          onClick={() => toggleMealExpansion("friday-dinner")}
                        >
                          <div className="meal-title">
                            <span className="meal-name">Dinner</span>
                            <span className="meal-time">7:30 PM</span>
                          </div>
                          <button className="expand-button">
                            {expandedMeals["friday-dinner"] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="day-footer">
                    <div className="nutrition-summary">
                      <div className="nutrition-total">
                        <span>Total Calories</span>
                        <span>2200</span>
                      </div>
                      <div className="macros-distribution">
                        <div className="macro protein">
                          <span>Protein</span>
                          <span>165g (30%)</span>
                        </div>
                        <div className="macro carbs">
                          <span>Carbs</span>
                          <span>247g (45%)</span>
                        </div>
                        <div className="macro fat">
                          <span>Fat</span>
                          <span>61g (25%)</span>
                        </div>
                      </div>
                    </div>
                    <button className="btn-primary full-width">Log Today's Meals</button>
                  </div>
                </div>
              </div>
              
              <div className="progress-section">
                <h3 className="progress-title">Week 1 Nutrition Progress</h3>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: "29%" }}></div>
                </div>
                <div className="progress-stats">
                  <span>2/7 days tracked</span>
                  <span>29%</span>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === "week2" && (
            <div className="tab-content">
              <div className="placeholder-message">
                Week 2 meal plans will be available after completing Week 1
              </div>
            </div>
          )}
          
          {activeTab === "week3" && (
            <div className="tab-content">
              <div className="placeholder-message">
                Week 3 meal plans will be available after completing Week 2
              </div>
            </div>
          )}
          
          {activeTab === "week4" && (
            <div className="tab-content">
              <div className="placeholder-message">
                Week 4 meal plans will be available after completing Week 3
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}