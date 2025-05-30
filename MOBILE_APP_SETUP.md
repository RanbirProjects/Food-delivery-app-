# Mobile App Setup Guide

This guide will help you set up the mobile apps for our food delivery platform.

## Prerequisites

- Node.js (v14 or higher)
- React Native CLI
- Xcode (for iOS development)
- Android Studio (for Android development)
- CocoaPods (for iOS dependencies)

## Setup Instructions

### 1. Clone the Mobile App Repository

```bash
git clone https://github.com/your-username/food-delivery-mobile.git
cd food-delivery-mobile
```

### 2. Install Dependencies

```bash
npm install
cd ios && pod install && cd ..
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
API_URL=http://your-api-url
MAPS_API_KEY=your-google-maps-api-key
```

### 4. iOS Setup

1. Open the iOS project in Xcode:
```bash
cd ios
open FoodDelivery.xcworkspace
```

2. Update the bundle identifier in Xcode
3. Configure signing certificates
4. Build and run the app

### 5. Android Setup

1. Open the project in Android Studio:
```bash
cd android
./gradlew assembleDebug
```

2. Update the application ID in `android/app/build.gradle`
3. Configure signing keys
4. Build and run the app

## Features

- User authentication
- Restaurant browsing and searching
- Menu viewing and ordering
- Real-time order tracking
- Push notifications
- Payment integration
- Location services
- Favorites and history

## Building for Production

### iOS

1. Update version and build number in Xcode
2. Archive the app
3. Upload to App Store Connect

### Android

1. Update version in `android/app/build.gradle`
2. Generate signed APK/Bundle
3. Upload to Google Play Console

## Testing

```bash
# Run tests
npm test

# Run iOS tests
cd ios && xcodebuild test

# Run Android tests
cd android && ./gradlew test
```

## Troubleshooting

### Common iOS Issues

1. Pod installation fails
   - Run `pod repo update`
   - Delete Pods directory and Podfile.lock
   - Run `pod install` again

2. Build errors
   - Clean build folder in Xcode
   - Reset iOS simulator
   - Check signing certificates

### Common Android Issues

1. Gradle sync fails
   - Update Android Studio
   - Check JDK version
   - Clean project

2. Build errors
   - Clean project
   - Invalidate caches
   - Check SDK versions

## Support

For any issues or questions, please contact:
- Email: support@yourdomain.com
- GitHub Issues: [Create an issue](https://github.com/your-username/food-delivery-mobile/issues)

## License

This project is licensed under the MIT License - see the LICENSE file for details. 