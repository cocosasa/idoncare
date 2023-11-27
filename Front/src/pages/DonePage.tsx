import { useLocation } from 'react-router-dom';
import MoneyDone from '../components/pocketmoney/MoneyDone';
import Header from './../components/common/Header';
import BottomNav from '../components/common/BottomNav';

export interface DoneData {
  title: string;
  content: string;
  ps: string;
  is_done?: boolean;
}

interface RouteState {
  state: DoneData;
}

function DonePage() {
const state = (useLocation() as RouteState).state;
  return (
    <div>
      <Header pageTitle="확인" />
      <MoneyDone
        ps={state.ps}
        title={state.title}
        content={state.content}
        is_done={state.is_done}
      />
      <BottomNav />
    </div>
  );
}

export default DonePage