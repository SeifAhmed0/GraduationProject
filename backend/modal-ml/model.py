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
        features_list = input_json["features"]
        features_array = np.array(features_list)
        predictions = model.predict(features_array)
        results = [{'features': features, 'prediction': prediction} for features, prediction in zip(features_list, predictions)]
        print(json.dumps(results))
    except ValueError as e:
        print(json.dumps({'error': str(e)}))

if __name__ == '__main__':
    main()
