import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import accuracy_score

data = pd.read_csv("spam.csv")

x = data["message"]
y = data["label"]

vectorizer = TfidfVectorizer()
x = vectorizer.fit_transform(x)

x_train, x_test, y_train, y_test = train_test_split(
    x, y, test_size=0.2, random_state=42
)

model = MultinomialNB()
model.fit(x_train, y_train)

prediction = model.predict(x_test)

print("Accuracy:", accuracy_score(y_test, prediction))

msg = ["tomorrow we have a meeting at 10 am"]
msg = vectorizer.transform(msg)

result = model.predict(msg)

print("Prediction:", result[0])