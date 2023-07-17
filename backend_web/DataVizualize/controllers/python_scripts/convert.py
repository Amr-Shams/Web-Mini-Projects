import base64
import json
import sys
import pandas as pd
import matplotlib.pyplot as plt
file_path = r'/Users/amraly/Downloads/de2023Internship/ML/Classifier'
file_name = 'test.csv'
# Read the data from stdin using pandas
data = pd.read_csv(file_path + '/' + file_name)
# Generate a histogram of the data using matplotlib
plt.hist(data['PassengerId'], bins=10,stacked=True, alpha=0.5, histtype='bar', ec='black')
plt.title('Histogram of PassengerId')
plt.xlabel('Value')
plt.ylabel('Frequency')
plt.savefig('histogram.png')
plt.show()
# Print a summary of the data using pandas
description = data.describe()
print(description)
