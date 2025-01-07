import {RootStackParamList} from '../../navigation/navigationTypes';

interface MenuItem {
  title: string;
  subtitle: string;
  screen: {
    name: keyof RootStackParamList;
    params?: any;
  };
}

export const menuItems: MenuItem[] = [
  {
    title: 'My Orders',
    subtitle: 'Already have a 10 orders',
    screen: {name: 'myOrder'}, // Use object structure for screen
  },
  {
    title: 'Shipping Address',
    subtitle: 'Manage your shipping address',
    screen: {name: 'shippingAddress'},
  },
  {
    title: 'Payment Method',
    subtitle: 'Manage your payment methods',
    screen: {name: 'paymentMethod'},
  },
  {
    title: 'My Reviews',
    subtitle: 'Check your reviews and ratings',
    screen: {name: 'myReview'},
  },
  {
    title: 'Setting',
    subtitle: 'Customize your app settings',
    screen: {name: 'setting'},
  },
];
