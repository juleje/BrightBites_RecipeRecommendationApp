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
print("cal: " + str(meal_cal)) 
print("sug: " + str(meal_sug)) 
print("Fat: " + str(meal_fat))  
print("sod: " + str(meal_sod)) 

#const thresholds = {Calories: { low: 400, medium: 700 },Sugar: { low: 10, medium: 20 },Fat: { low: 10, medium: 22 },Sodium: { low: 150, medium: 700 }};
# Define the daily recommended values
daily_cal = 2000
daily_sug = 50
daily_fat = 150
daily_sod = 5000

# Calculate the percentage of daily value for each nutrient
cal_percent = (meal_cal / daily_cal) * 100
sug_percent = (meal_sug / daily_sug) * 100
fat_percent = (meal_fat / daily_fat) * 100
sod_percent = (meal_sod / daily_sod) * 100

# Print the results
print(f"Percentage of daily calories: {cal_percent:.1f}%")
print(f"Percentage of daily sugar: {sug_percent:.1f}%")
print(f"Percentage of daily fat: {fat_percent:.1f}%")
print(f"Percentage of daily sodium: {sod_percent:.1f}%")

#Recommended per meal: 600/2000= 30%
overal_percent = cal_percent+sug_percent+fat_percent+sod_percent
overal_permeal = 400
scaled = overal_percent/overal_permeal
benead = scaled<0.3
print(f"Overal score: {overal_percent:.1f}")
print(f"Overal score: {scaled:.1f}")
print(f"is benead 30?: {benead}")