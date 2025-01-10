import React, {useState} from 'react';
import {useAppSelector} from '../redux-toolkit/hooks';
import {useGetCartQuery} from '../redux-toolkit/features/cart/cartApi';
import {RootState} from '../redux-toolkit/store';
import {ScrollView} from 'react-native';
import Accordion from '../components/PaymentComponents/Accordion';
import PaymentHeader from '../components/PaymentComponents/PaymentHeader';
import TotalAmount from '../components/PaymentComponents/TotalAmount';
import CardPayment from '../components/PaymentComponents/CardPayment';
import NetBankingPayment from '../components/PaymentComponents/NetBankingPayment';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EmiPayment from '../components/PaymentComponents/EmiPayment';
import WalletPayment from '../components/PaymentComponents/WalletPayment';
import CashOnDelivery from '../components/PaymentComponents/CashOnDelivery';
import PaymentFooter from '../components/PaymentComponents/PaymentFooter';
import GiftCard from '../components/PaymentComponents/GiftCard';
import AntDesign from 'react-native-vector-icons/AntDesign';

const PaymentScreen: React.FC = () => {
  const {user} = useAppSelector((state: RootState) => state.auth);
  const userId = user?._id ?? '';
  const {data} = useGetCartQuery(userId);
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggleAccordion = (section: string) => {
    setExpanded(expanded === section ? null : section);
  };

  return (
    <ScrollView className="flex-1 bg-gray-100 p-4">
      <PaymentHeader />
      <TotalAmount totalAmount={data?.totalAmount || 0} />

      <Accordion
        title="Credit/Debit/ATM Card"
        icon={<FontAwesome name="credit-card" size={24} color="#4f46e5" />}
        expanded={expanded === 'card'}
        onToggle={() => toggleAccordion('card')}>
        <CardPayment totalAmount={data?.totalAmount || 0} />
      </Accordion>

      <Accordion
        title="EMI"
        icon={<Entypo name="bar-graph" size={24} color="#4f46e5" />}
        expanded={expanded === 'emi'}
        onToggle={() => toggleAccordion('emi')}>
        <EmiPayment />
      </Accordion>

      <Accordion
        title="Net Banking"
        icon={
          <MaterialIcons name="account-balance" size={24} color="#4f46e5" />
        }
        expanded={expanded === 'netBanking'}
        onToggle={() => toggleAccordion('netBanking')}>
        <NetBankingPayment totalAmount={data?.totalAmount || 0} />
      </Accordion>

      <Accordion
        title="Wallets"
        icon={<FontAwesome name="google-wallet" size={24} color="#4f46e5" />}
        expanded={expanded === 'wallets'}
        onToggle={() => toggleAccordion('wallets')}>
        <WalletPayment totalAmount={data?.totalAmount || 0} />
      </Accordion>
      <Accordion
        title="Have a Luxe Gift Card?"
        icon={<AntDesign name="gift" size={24} color="#4f46e5" />}
        expanded={expanded === 'giftCard'}
        onToggle={() => toggleAccordion('giftCard')}>
        <GiftCard />
      </Accordion>

      <CashOnDelivery />

      <PaymentFooter />
    </ScrollView>
  );
};

export default PaymentScreen;