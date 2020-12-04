import React, { Component } from 'react';
import { Animated, StyleSheet, Text, View, I18nManager } from 'react-native';

import { RectButton, Swipeable } from 'react-native-gesture-handler';

export default class AndroidSwipe extends Component {
    renderLeftActions = (progress, dragX) => {
        const trans = dragX.interpolate({
            inputRange: [0, 50, 100, 101],
            outputRange: [-20, 0, 0, 1],
        });
        return (
            <RectButton style={styles.leftAction} onPress={this.close}>
                <Animated.Text
                    style={[
                        styles.actionText
                    ]}
                >
                    DELETE
                </Animated.Text>
            </RectButton>
        );
    };
    renderRightActions = (progress, dragX) => {
        const trans = dragX.interpolate({
            inputRange: [0, 50, 100, 101],
            outputRange: [-20, 0, 0, 1],
        });
        return (
            <RectButton style={styles.rightAction} onPress={this.close}>
                <Animated.Text
                    style={[
                        styles.actionText, { textAlign: 'left' }
                    ]}
                >
                    DELETE
                </Animated.Text>
            </RectButton>
        );
    };

    updateRef = ref => {
        this._swipeableRow = ref;
    };
    close = () => {
        this.props.onSwipe()
        // this._swipeableRow.close();
    };
    render() {
        const { children } = this.props;
        return (
            <Swipeable
                ref={this.updateRef}
                friction={2}
                leftThreshold={30}
                rightThreshold={40}
                renderLeftActions={this.renderLeftActions}
                renderRightActions={this.renderRightActions}>
                {children}
            </Swipeable>
        );
    }
}

const styles = StyleSheet.create({

    leftAction: {
        flex: 1,
        backgroundColor: 'darkred',
        justifyContent: 'center',
    },
    actionText: {
        color: 'white',
        fontSize: 16,
        backgroundColor: 'transparent',
        padding: 10,
    },
    rightAction: {
        alignItems: 'flex-end',
        flex: 1,
        backgroundColor: 'darkred',
        justifyContent: 'center',
    },
});