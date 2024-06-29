import sys
import joblib
import numpy as np
import json

def main():
    if len(sys.argv) < 2:
        print(json.dumps({'error': 'No input data provided'}))
        return

    input_data = sys.argv[1]
    model = joblib.load('model.pkl')

    try:
        input_json = json.loads(input_data)
        features = input_json["features"]
        features_list = [feature["values"] for feature in features]
        features_array = np.array(features_list)
        predictions = model.predict(features_array)
    except ValueError as e:
        print("Error parsing JSON:", e)
        return
    
    results = [
        {'id': feature['id'], 'features': feature['values'], 'prediction': prediction}
        for feature, prediction in zip(features, predictions)
    ]
    
    print(json.dumps(results))

if __name__ == '__main__':
    main()
