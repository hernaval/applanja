import { ActivityIndicator, StyleSheet, View } from "react-native"

type LoadingSpinnerProps = {
    visible: boolean
}
const LoadingSpinner = (props: LoadingSpinnerProps) => {
    if(!props.visible) return 
  return (
    <View style={styles.spinnerContainer}>
        <ActivityIndicator size={48} color={'#d3d3d3'} />
    </View>
  )
}

const styles = StyleSheet.create({
    spinnerContainer: {
        ...StyleSheet.absoluteFillObject, // Fills the entire screen
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',       
    },
})

export default LoadingSpinner