import pandas as pd

data = pd.read_parquet("Backend/data/big_recipes.indexed.parquet")


def lookup_recipe_by_name(name):
    result = data[data['Name'].str.contains(name, case=False, na=False)]
    return result


recipes = lookup_recipe_by_name("Slow Cooker Thai Chicken").iloc[0]


# Define the meal's nutritional values
meal_cal = recipes['Calories']
meal_sug = recipes['SugarContent']
meal_fat = recipes['FatContent']
meal_sod = recipes['SodiumContent']

print("name: " + recipes['Name']) 
print("cal: " + str(meal_cal) + " kcal") 
print("sug: " + str(meal_sug) + " g") 
print("Fat: " + str(meal_fat) + " g")  
print("sod: " + str(meal_sod) + " mg") 

#const thresholds = {Calories: { low: 400, medium: 700 },Sugar: { low: 10, medium: 20 },Fat: { low: 10, medium: 22 },Sodium: { low: 150, medium: 700 }};
# Define the daily recommended values

daily_cal = 2000 / 3                        # 2000 kcal as mean daily intake
daily_sod = 2000 / 3                        # 2g sodium as maximum daily intake
daily_fat = (0.3 * daily_cal) / 9           # 1 calory fat equals 9 grams
daily_sug = (0.1 * daily_cal) / 4           # 1 calory carbohydrates equals 4 grams

print("Daily recommended cal: " + str(daily_cal) + " kcal") 
print("Daily recommended sug: " + str(daily_sug) + " g") 
print("Daily recommended Fat: " + str(daily_fat) + " g")  
print("Daily recommended sod: " + str(daily_sod) + " mg") 

# Calculate the percentage of daily value for each nutrient
cal_percent = (meal_cal / daily_cal) * 100
sug_percent = (meal_sug / daily_sug) * 100
fat_percent = (meal_fat / daily_fat) * 100
sod_percent = (meal_sod / daily_sod) * 100

# Print the results
print(f"Percentage of calories for one meal: {cal_percent:.1f}%")
print(f"Percentage of sugar for one meal: {sug_percent:.1f}%")
print(f"Percentage of fat for one meal: {fat_percent:.1f}%")
print(f"Percentage of sodium for one meal: {sod_percent:.1f}%")

#Recommended per meal: 600/2000= 30%
overal_percent = cal_percent+sug_percent+fat_percent+sod_percent
scaled = overal_percent/400
print(f"Overal score: {scaled:.3f}")     # number to be used for comparison accross meals