# **Expo Get Image**

<img src="img/img1.png" alt="image1" style="" />

![image1](img/img2.png)

<img src="img/img3.png" alt="image1" style="" />

A package that helps you get images quickly from Camera and ImagePicker

### Installation

Add expo-get-image to your project by executing

```
$  npm install expo-get-image
or
$ yarn add expo-get-image
```



> and that's it, you're all good to go!



### Usage

```javascript

import React, {Component} from 'react';
import {View} from 'react-native';
import {NumberView} from 'react-native-number-view'
 
type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
          <NumberView
            enableDefaultStyles={true}
            themeColor="#3F6D2A"
            leftContent={<Text>😔</Text>}
            rightContent={<Text>😃</Text>}
            onValueChange={(newVal)=>{alert(newVal)}}
            onDecrement={()=>{alert('decremented')}}
            onIncrement={()=>{alert('Incremented')}}
          />
      </View>
    );
  }
}

```





## API's

| Name                          | Use                                          | Default Values |
| ----------------------------- | ---------------------------------------------| -------------- |
| onSuccess                     | Call back function that returns the image uri| None           |
| onCancel                      | Content to be displayed on the Right         | None           |
| onValueChange                 | Callback which return new value              | None           |
| onDecrement                   | callback each time value is decremented      | None           |
| onIncrement                   | callback each time value is incremented      | None           |
| themeColor                    | Use to set a theme color(only accepts HEX)   | none           |
| enableDefaultStyles (boolean) | enable or disable preset styles              | True           |
| initialValue                  | counters initial value                       | 0              |
|                               |                                              |                |



## Contributions

What to help make this package even more awesome? [Read how to contribute](https://github.com/react-native-nigeria/react-native-number-view/blob/master/contribution.md)



## Licensing

This project is licensed under MIT license.



### Don't forget to star, like and share :)
