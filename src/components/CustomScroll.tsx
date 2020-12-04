import React from "react";
import Animated, {
    interpolate,
    useAnimatedStyle,
    useAnimatedScrollHandler,
    useSharedValue,
    withSpring,
    useDerivedValue
} from "react-native-reanimated";
import { Dimensions, View, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");
const ratio = 228 / 362;
export const CARD_WIDTH = width * 0.8;
export const CARD_HEIGHT = CARD_WIDTH * ratio;

const styles = StyleSheet.create({
    card: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        borderRadius: 16,
        borderWidth: 1
    },
});

const dummy =
    [
        {
            "albumId": 1,
            "id": 1,
            "title": "accusamus beatae ad facilis cum similique qui sunt",
            "url": "https://via.placeholder.com/600/92c952",
            "thumbnailUrl": "https://via.placeholder.com/150/92c952"
        },
        {
            "albumId": 1,
            "id": 2,
            "title": "reprehenderit est deserunt velit ipsam",
            "url": "https://via.placeholder.com/600/771796",
            "thumbnailUrl": "https://via.placeholder.com/150/771796"
        },
        {
            "albumId": 3,
            "id": 3,
            "title": "officia porro iure quia iusto qui ipsa ut modi",
            "url": "https://via.placeholder.com/600/24f355",
            "thumbnailUrl": "https://via.placeholder.com/150/24f355"
        },
        {
            "albumId": 1,
            "id": 2,
            "title": "reprehenderit est deserunt velit ipsam",
            "url": "https://via.placeholder.com/600/771796",
            "thumbnailUrl": "https://via.placeholder.com/150/771796"
        },
        {
            "albumId": 3,
            "id": 3,
            "title": "officia porro iure quia iusto qui ipsa ut modi",
            "url": "https://via.placeholder.com/600/24f355",
            "thumbnailUrl": "https://via.placeholder.com/150/24f355"
        },
        {
            "albumId": 1,
            "id": 2,
            "title": "reprehenderit est deserunt velit ipsam",
            "url": "https://via.placeholder.com/600/771796",
            "thumbnailUrl": "https://via.placeholder.com/150/771796"
        },
        {
            "albumId": 3,
            "id": 3,
            "title": "officia porro iure quia iusto qui ipsa ut modi",
            "url": "https://via.placeholder.com/600/24f355",
            "thumbnailUrl": "https://via.placeholder.com/150/24f355"
        },
        {
            "albumId": 1,
            "id": 2,
            "title": "reprehenderit est deserunt velit ipsam",
            "url": "https://via.placeholder.com/600/771796",
            "thumbnailUrl": "https://via.placeholder.com/150/771796"
        },


    ]

export default ({ data = [] }) => {
    console.log(data, 'data')
    const direction = useSharedValue(0);
    const scrollHandler = useAnimatedScrollHandler<{ y?: number }>({
        onEndDrag: () => {
            direction.value = 0;
        },
        onScroll: (event, ctx) => {
            const dy = event.contentOffset.y - (ctx?.y ?? 0);
            direction.value = Math.sign(dy);
            ctx.y = event.contentOffset.y;
        },
    }, [data, direction]);

    return (
        <Animated.ScrollView
            onScroll={scrollHandler}
            scrollEventThrottle={16}
        >
            {/* data */}
            {data.map((item, index) => {
                const style = useAnimatedStyle(() => {
                    console.log('lola')
                    // const skewY = withTiming(
                    //     interpolate(
                    //         direction.value,
                    //         [-1, 0, 1],
                    //         [-Math.PI / 18, 0, Math.PI / 18]
                    //     )
                    // );
                    return {
                        // transform: [{ skewY }],
                    };
                });

                return (
                    <Animated.View
                        key={index}
                        style={[
                            {
                                width: "100%",
                                justifyContent: "center",
                                alignItems: "center",
                                marginTop: 45,
                            },
                            // style,
                        ]}
                    >
                        <Card />
                    </Animated.View>
                );
            })}
        </Animated.ScrollView>
    );
};



const Card = ({ card }: any) => {
    return <View style={styles.card} />;
};
