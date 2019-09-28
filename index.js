import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { MyIcon, Text } from '../../App'
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const rem = deviceWidth/rem

export default class CameraView extends React.PureComponent {

    
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    openCamera: false,
    showAddImageModal: true
  }
  componentDidMount = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({ hasCameraPermission: status === 'granted' })
    this.getPermissionAsync();

  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }

  _takePicture = async () => {
    if (
      this.state.hasCameraPermission.status === null ||
      this.state.hasCameraPermission.status === false
    ) {
      alert('Camera permission not granted')
    }
    this.setState({ openCamera: true, addingImage: false })
  }

  snap = async () => {
    if (this.camera) {
      let result = await this.camera.takePictureAsync()
      this.setState({ openCamera: false })
      this.props.onSuccess(result);
      this.onCancel();
    }
     else {
      this.setState({openCamera:false})
      this.props.onCancel()
    }
  }

  changeCamera = () => {
    type = this.state.type
    if (type === Camera.Constants.Type.back) {
      this.setState({ type: Camera.Constants.Type.front })
    } else {
      this.setState({ type: Camera.Constants.Type.back })
    }
  }
  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4]
    })

    if (!result.cancelled) {
      this.props.onSuccess(result);
      this.props.onCancel();
    } else {
      this.props.onCancel();
    }
  }
  
  render () {
    return (
      <View style={styles.mainContainer}>
          <View style={styles.modalContainer}>
            <View style={styles.modalBody}>
              <Text style={styles.addExtraText}>Add Image</Text>
              <View style={styles.imageSelectorContainer}>
                <TouchableOpacity onPress={this._takePicture}>
                  <Text style={styles.imageSourceText}>Take a picture</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this._pickImage}>
                  <Text style={styles.imageSourceText}>
                    Select image from gallery
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={() => this.props.onCancel()}
                style={styles.modalButton}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        {
          this.state.openCamera && this.state.hasCameraPermission && (
          <View style={styles.CameraContainer}>
            <Camera
              style={styles.CameraStyles}
              type={this.state.type}
              ratio='4:3'
              ref={ref => {
                this.camera = ref
              }}
            >
              <View style={styles.cameraControls}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.closeCameraButton}
                  onPress={() =>this.onCancel() }
                >
                  <MyIcon
                    name='cancel'
                    size={25*rem}
                    color='red'
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.cameraButton}
                  onPress={() => this.snap()}
                >
                  <MyIcon
                    name='snap'
                    size={30*rem}
                    color='white'
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.changeCameraButton}
                  onPress={() => this.changeCamera()}
                >
                  <MyIcon
                    name='switch2'
                    size={25*rem}
                    color='white'
                  />
                </TouchableOpacity>
              </View>
            </Camera>
          </View>
        )}
      </View>
    )
  }
}

const styles = EStyleSheet.create({
  mainContainer:{
    flex: 1, 
    backgroundColor: 'white',
    position:'absolute',
    height:deviceHeight,
    width:deviceWidth
  },
  changeCameraButton: {
    borderColor: 'white',
    borderWidth: '3rem',
    height:50*rem,
    width: 50*rem,
    borderRadius: 25*rem,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 30*rem
  },
  addButtonText: {
    color: blue,
    fontSize: 18*rem,
    fontWeight: '400',
    textAlign: 'center'
  },
  cancelText: {
    color: 'rgb(240,120,120)',
    marginVertical: 5*rem,
  },
  imageSelectorContainer: {
    marginVertical: 10*rem,
  },
  imageSourceText: {
    color: '#397FD1',
    fontSize: 18*rem,
    fontWeight: '400',
    marginTop: 5*rem,
    textAlign: 'center'
  },
  addExtraText: {
    alignSelf: 'center',
    fontSize: 17*rem,
    color: '#555555'
  },
  modalButton: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center'
  },

  modalContainer: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.4)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: deviceHeight,
    width: deviceWidth
  },
  modalBody: {
    backgroundColor: '#fff',
    borderRadius: 10*rem ,
    padding: 10*rem,
    width: '70%',
    alignItems: 'center'
  },
  closeCameraButton: {
    borderColor: 'white',
    borderWidth: 3*rem,
    height: 50*rem,
    width: 50*rem,
    borderRadius: 25*rem,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 35*rem
  },
  container: {
    flex: 1
  },
  cameraControls: {
    marginBottom: 10*rem,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
    width:'100%'
  },
  closeCameraText: {
    color: 'red',
    fontSize: 10*rem
  },
  closeCameraButton: {
    borderColor: 'red',
    borderWidth: 3*rem,
    height: 50*rem,
    width: 50*rem,
    borderRadius: 25*rem,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 30*rem
  },
  cameraButton: {
    backgroundColor: '#ffa500',
    height: 50*rem,
    width: 50*rem,
    borderRadius: 25*rem,
    justifyContent: 'center',
    alignItems: 'center'
  },
  CameraContainer: {
    position: 'absolute',
    flex: 1,
    height: deviceHeight,
    width: deviceWidth,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)'
  },
  CameraStyles: {
    position: 'absolute',
    height: deviceHeight,
    width: deviceWidth,
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
})
