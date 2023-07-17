import pandas as pd
import io
import sys
import matplotlib.pyplot as plt

# Get the CSV data from the command-line arguments
file_buffer = sys.argv[1]

# Convert the CSV data to a pandas DataFrame
df = pd.read_csv(io.StringIO(file_buffer))

# Generate a histogram of the data using matplotlib
plt.hist(df['Sex'], bins=10, color='blue', edgecolor='black', linewidth=1.2, alpha=0.5, rwidth=0.9, label='Sex')
plt.hist(df['Age'], bins=10, color='red', edgecolor='black', linewidth=1.2, alpha=0.5, rwidth=0.9, label='Age')
plt.hist(df['Pclass'], bins=10, color='green', edgecolor='black', linewidth=1.2, alpha=0.5, rwidth=0.9, label='Pclass')
plt.hist(df['Fare'], bins=10, color='yellow', edgecolor='black', linewidth=1.2, alpha=0.5, rwidth=0.9, label='Fare')
plt.title('Histogram of Titanic')
plt.xlabel('Value')
plt.ylabel('Frequency')
plt.legend()

# Save the histogram to a file
plt.savefig('histogram.png')

# Print a summary of the data using pandas
description = df.describe()
print(description)
