// import { Image, TouchableOpacity, View } from "react-native"
// import { router } from "expo-router"

// export default function BottomBar({screen} : {screen:string}){
//     return(
//         screen === 'HomeScreen' &&
//             <View className="w-full h-12 bg-orange-500 flex justify-center">
//                 <View className="flex flex-row items-center justify-center gap-10">
//                     <TouchableOpacity>
//                         <Image className="w-10 h-10" source={require("../public/icons/ui/home.png")}></Image>
//                     </TouchableOpacity>
//                     <TouchableOpacity onPress={()=>{router.push('SearchScreen')}}>
//                         <Image className="w-10 h-10" source={require("../public/icons/ui/search.png")}></Image>
//                     </TouchableOpacity>
//                     <TouchableOpacity onPress={()=>{router.push('ProfileScreen')}}>
//                         <Image className="w-10 h-10" source={require("../public/icons/ui/person.png")}></Image>
//                     </TouchableOpacity>
//                     <TouchableOpacity onPress={()=>{router.push('CartScreen')}}>
//                         <Image className="w-10 h-10" source={require("../public/icons/ui/shoppingCart.png")}></Image>
//                     </TouchableOpacity>
//                     <TouchableOpacity onPress={()=>{router.push('OrderHistory')}}>
//                         <Image className="w-10 h-10" source={require("../public/icons/ui/order.png")}></Image>
//                     </TouchableOpacity>
//                 </View>
//             </View>
//         ||
//         screen === 'SearchScreen' &&
//             <View className="w-full h-12 bg-orange-500 flex justify-center">
//                 <View className="flex flex-row items-center justify-center gap-10">
//                     <TouchableOpacity onPress={()=>{router.push('HomeScreen')}}>
//                         <Image className="w-10 h-10" source={require("../public/icons/ui/home.png")}></Image>
//                     </TouchableOpacity>
//                     <TouchableOpacity>
//                         <Image className="w-10 h-10" source={require("../public/icons/ui/search.png")}></Image>
//                     </TouchableOpacity>
//                     <TouchableOpacity onPress={()=>{router.push('ProfileScreen')}}>
//                         <Image className="w-10 h-10" source={require("../public/icons/ui/person.png")}></Image>
//                     </TouchableOpacity>
//                     <TouchableOpacity onPress={()=>{router.push('CartScreen')}}>
//                         <Image className="w-10 h-10" source={require("../public/icons/ui/shoppingCart.png")}></Image>
//                     </TouchableOpacity>
//                     <TouchableOpacity onPress={()=>{router.push('OrderHistory')}}>
//                         <Image className="w-10 h-10" source={require("../public/icons/ui/order.png")}></Image>
//                     </TouchableOpacity>
//                 </View>
//             </View>
//         ||
//         screen === 'ProfileScreen' &&
//             <View className="w-full h-12 bg-orange-500 flex justify-center">
//                 <View className="flex flex-row items-center justify-center gap-10">
//                     <TouchableOpacity onPress={()=>{router.push('HomeScreen')}}>
//                         <Image className="w-10 h-10" source={require("../public/icons/ui/home.png")}></Image>
//                     </TouchableOpacity>
//                     <TouchableOpacity onPress={()=>{router.push('SearchScreen')}}>
//                         <Image className="w-10 h-10" source={require("../public/icons/ui/search.png")}></Image>
//                     </TouchableOpacity>
//                     <TouchableOpacity>
//                         <Image className="w-10 h-10" source={require("../public/icons/ui/person.png")}></Image>
//                     </TouchableOpacity>
//                     <TouchableOpacity onPress={()=>{router.push('CartScreen')}}>
//                         <Image className="w-10 h-10" source={require("../public/icons/ui/shoppingCart.png")}></Image>
//                     </TouchableOpacity>
//                     <TouchableOpacity onPress={()=>{router.push('OrderHistory')}}>
//                         <Image className="w-10 h-10" source={require("../public/icons/ui/order.png")}></Image>
//                     </TouchableOpacity>
//                 </View>
//             </View>
//         ||
//         screen === 'CartScreen' &&
//             <View className="w-full h-12 bg-orange-500 flex justify-center">
//                 <View className="flex flex-row items-center justify-center gap-10">
//                     <TouchableOpacity onPress={()=>{router.push('HomeScreen')}}>
//                         <Image className="w-10 h-10" source={require("../public/icons/ui/home.png")}></Image>
//                     </TouchableOpacity>
//                     <TouchableOpacity onPress={()=>{router.push('SearchScreen')}}>
//                         <Image className="w-10 h-10" source={require("../public/icons/ui/search.png")}></Image>
//                     </TouchableOpacity>
//                     <TouchableOpacity onPress={()=>{router.push('ProfileScreen')}}>
//                         <Image className="w-10 h-10" source={require("../public/icons/ui/person.png")}></Image>
//                     </TouchableOpacity>
//                     <TouchableOpacity >
//                         <Image className="w-10 h-10" source={require("../public/icons/ui/shoppingCart.png")}></Image>
//                     </TouchableOpacity>
//                     <TouchableOpacity onPress={()=>{router.push('OrderHistory')}}>
//                         <Image className="w-10 h-10" source={require("../public/icons/ui/order.png")}></Image>
//                     </TouchableOpacity>
//                 </View>
//             </View>
            
//         ||
        
//         screen === 'OrderHistory' &&
//             <View className="w-full h-12 bg-orange-500 flex justify-center">
//                 <View className="flex flex-row items-center justify-center gap-10">
//                     <TouchableOpacity onPress={()=>{router.push('HomeScreen')}}>
//                         <Image className="w-10 h-10" source={require("../public/icons/ui/home.png")}></Image>
//                     </TouchableOpacity>
//                     <TouchableOpacity onPress={()=>{router.push('SearchScreen')}}>
//                         <Image className="w-10 h-10" source={require("../public/icons/ui/search.png")}></Image>
//                     </TouchableOpacity>
//                     <TouchableOpacity onPress={()=>{router.push('ProfileScreen')}}>
//                         <Image className="w-10 h-10" source={require("../public/icons/ui/person.png")}></Image>
//                     </TouchableOpacity>
//                     <TouchableOpacity onPress={()=>{router.push('CartScreen')}}>
//                         <Image className="w-10 h-10" source={require("../public/icons/ui/shoppingCart.png")}></Image>
//                     </TouchableOpacity>
//                     <TouchableOpacity >
//                         <Image className="w-10 h-10" source={require("../public/icons/ui/order.png")}></Image>
//                     </TouchableOpacity>
//                 </View>
//             </View>
            
//         ||
        

        
//             <View className="w-full h-12 bg-orange-500 flex justify-center">
//                 <View className="flex flex-row items-center justify-center gap-10">
//                     <TouchableOpacity onPress={()=>{router.push('HomeScreen')}}>
//                         <Image className="w-10 h-10" source={require("../public/icons/ui/home.png")}></Image>
//                     </TouchableOpacity>
//                     <TouchableOpacity onPress={()=>{router.push('SearchScreen')}}>
//                         <Image className="w-10 h-10" source={require("../public/icons/ui/search.png")}></Image>
//                     </TouchableOpacity>
//                     <TouchableOpacity onPress={()=>{router.push('ProfileScreen')}}>
//                         <Image className="w-10 h-10" source={require("../public/icons/ui/person.png")}></Image>
//                     </TouchableOpacity>
//                     <TouchableOpacity onPress={()=>{router.push('CartScreen')}}>
//                         <Image className="w-10 h-10" source={require("../public/icons/ui/shoppingCart.png")}></Image>
//                     </TouchableOpacity>
//                     <TouchableOpacity onPress={()=>{router.push('OrderHistory')}}>
//                         <Image className="w-10 h-10" source={require("../public/icons/ui/order.png")}></Image>
//                     </TouchableOpacity>
//                 </View>
//             </View>
//     )
// }