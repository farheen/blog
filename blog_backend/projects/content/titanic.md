title: Kaggle Titanic Survival Prediction Project
image: project_images/titanic.png
code_url: https://github.com/farheen/titanic
---
**Predicting who survived the Titanic from passenger data: my first end-to-end machine-learning project.**

The Titanic dataset is one of the best-known datasets in machine learning. Using records for 891 passengers, the goal is to predict survival for 418 more and submit the predictions to Kaggle.

### What the data says

Exploring the data first revealed how unequal survival was:

- **74.2%** of women survived, compared with just **18.9%** of men, reflecting the "women and children first" evacuation.
- Ticket class mattered too: **63%** of first-class passengers survived, against **24%** in third class.

### The model

- Selected features: **ticket class, sex, and the number of siblings, spouses, parents and children aboard**.
- Converted categorical values into numeric columns with one-hot encoding.
- Trained a **Random Forest** classifier, an ensemble of decision trees that handles interactions like *"third-class men"* well.
- Generated predictions for the test set and produced a Kaggle submission file.

### Tech stack

Python · pandas · scikit-learn · Google Colab
