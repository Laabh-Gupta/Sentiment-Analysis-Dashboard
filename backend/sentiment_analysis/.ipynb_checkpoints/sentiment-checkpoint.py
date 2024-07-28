from textblob import TextBlob
import sys
import json

def analyze_sentiment(text):
    blob = TextBlob(text)
    sentiment_score = blob.sentiment.polarity
    sentiment = "positive" if sentiment_score > 0 else "negative" if sentiment_score < 0 else "neutral"
    return {"sentiment": sentiment, "score": sentiment_score}

if __name__ == "__main__":
    input_text = sys.argv[1]
    result = analyze_sentiment(input_text)
    print(json.dumps(result))
