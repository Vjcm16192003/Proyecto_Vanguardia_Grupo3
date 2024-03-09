import tensorflow as tf
import numpy as np
import pandas as pd
import keras as kr
from keras import layers
import tensorflow_docs as tfdocs
import tensorflow_docs.modeling
import numpy as np
import matplotlib.pyplot as plt
import os

def data():
    df = pd.read_csv('vitalia\src\Modules\AI\DatosPracticas.csv')
    dataset = df.values
    X= dataset[:,0:5]
    Y= dataset[:,5]
    model= createModal()
    return model, X, Y

def createModal():
    model = kr.Sequential([
        layers.Dense(64,activation='relu',input_shape=[5]),
        layers.Dense(64,activation='relu'),
        layers.Dense(1)
    ])
    optimizer= kr.optimizers.RMSprop(learning_rate=0.001)
    model.compile(loss='mse',optimizer=optimizer,metrics=['mae','mse'])
    return model

def training():
    model, X, Y = data()
    checkpoint_path = "vitalia\src\Modules\AI\cp.h5"
    model.fit(X,Y,
              epochs=3000,
              verbose=False,
              callbacks=[tfdocs.modeling.EpochDots()])
    model.save(checkpoint_path)
    return model

def LossGraph(historial):
    plt.xlabel("# epoca")
    plt.ylabel("Magnitud de perdida")
    plt.plot(historial.history["loss"])

def PredictionGraph(model, X , Y):
    test_predictions= model.predict(X).flatten()
    plt.axes(aspect='equal')
    plt.scatter(Y,test_predictions)
    plt.xlabel('X')
    plt.ylabel('Y')
    _=plt.plot(Y,Y,color='orange')

def loadModal():
    checkpoint_path = "vitalia\src\Modules\AI\cp.h5"
    model = kr.models.load_model(checkpoint_path)
    return model
    
def prediction(age,weight,height,sex,physicalActivity):
    model= loadModal()
    model.summary()
    x= model.predict(np.array([[age,weight,height,sex,physicalActivity]]))
    return x

x=prediction(25,48,165,1,1)
print(x)