import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";
import Login from "./pages/Login";
import PocketMoney from "./pages/PocketMoney";
import Wallet from "./pages/Wallet";
import Home from "./pages/Home";
import DemandMoneyCheck from "./pages/DemandMoneyCheck";
import SendPocketMoney from "./pages/PocketMoneySend";
import SendRegularMoney from "./pages/RegularMoneySend";
import KidDemandMoney from "./pages/KidDemandMoney";
import KidDemandMoneyList from "./pages/KidDemandMoneyList";
import KidDemanedMoneyList from "./pages/KidDemanedMoneyList";
import KidRegist from "./pages/KidRegist";
import Signup from "./pages/Signup";
import WalletSearch from "./pages/WalletSearch";
import { AppLayout } from "./layouts/AppLayout";
import WalletRecharge from "./pages/WalletRecharge";
import NewAccount from "./pages/NewAccount";
import Purchase from "./pages/Purchase";
import QRcodePurchase from "./pages/QRcodePurchase";
import CameraPurchase from "./pages/CameraPurchase";
import MyPage from "./pages/MyPage";
import Report from "./pages/Report";
import Transfer from "./pages/Transfer";
import TransferSelect from "./pages/TransferSelect";
import TransferConfirm from "./pages/TransferConfirm";
import ParentSetting from "./pages/ParentSetting";
import KidSetting from "./pages/KidSetting";
import MissonPage from "./pages/MissonPage";
import MissionDetailPage from "./pages/MissionDetailPage";
import MissionCreatPage from "./pages/MissionCreatPage";
import MissionCreateMoney from "./pages/MissionCreateMoney";
import PrivateRoute from "./routes/privateRoute";
import DonePage from "./pages/DonePage";
import NotFound from "./pages/NotFound";
import Preparing from "./pages/Preparing";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const queryClient = new QueryClient();
  return (
    <RecoilRoot>
      <AppLayout>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Routes>
              <Route element={<PrivateRoute />}>
                <Route path="/" element={<Home />} />
              </Route>
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route element={<PrivateRoute />}>
                <Route path="mypage" element={<MyPage />} />
              </Route>
              <Route element={<PrivateRoute />}>
                <Route path="wallet" element={<Wallet />} />
              </Route>
              <Route element={<PrivateRoute />}>
                <Route path="wallet/search" element={<WalletSearch />} />
              </Route>
              <Route element={<PrivateRoute />}>
                <Route path="wallet/recharge" element={<WalletRecharge />} />
              </Route>
              <Route element={<PrivateRoute />}></Route>
              <Route element={<PrivateRoute />}>
                <Route path="report" element={<Report />} />
              </Route>
              <Route element={<PrivateRoute />}>
                <Route path="purchase" element={<Purchase />} />
              </Route>
              <Route element={<PrivateRoute />}>
                <Route
                  path="purchase/qrcode/:payType"
                  element={<QRcodePurchase />}
                />
              </Route>
              <Route element={<PrivateRoute />}>
                <Route path="purchase/camera" element={<CameraPurchase />} />
              </Route>
              <Route element={<PrivateRoute />}>
                <Route path="transfer/account" element={<TransferSelect />} />
              </Route>
              <Route element={<PrivateRoute />}>
                <Route path="transfer/input/:option" element={<Transfer />} />
              </Route>
              <Route element={<PrivateRoute />}>
                <Route
                  path="transfer/confirm/:option"
                  element={<TransferConfirm />}
                />
              </Route>
              <Route element={<PrivateRoute />}>
                <Route path="pocketMoney" element={<PocketMoney />} />
              </Route>
              <Route element={<PrivateRoute />}>
                <Route
                  path="demandMoneyCheck/:pocketMoneyRequestId"
                  element={<DemandMoneyCheck />}
                />
                <Route path="sendPocketMoney" element={<SendPocketMoney />} />
              </Route>
              <Route element={<PrivateRoute />}>
                <Route path="sendRegularMoney" element={<SendRegularMoney />} />
              </Route>
              <Route element={<PrivateRoute />}>
                <Route path="kidDemandMoney" element={<KidDemandMoney />} />
              </Route>
              <Route element={<PrivateRoute />}>
                <Route
                  path="kidDemandMoneyList"
                  element={<KidDemandMoneyList />}
                />
              </Route>
              <Route element={<PrivateRoute />}>
                <Route
                  path="kidDemanedMoneyList"
                  element={<KidDemanedMoneyList />}
                />
              </Route>
              <Route element={<PrivateRoute />}>
                <Route path="kidRegist" element={<KidRegist />} />
              </Route>
              <Route element={<PrivateRoute />}>
                <Route
                  path="kidDemandMoneyList"
                  element={<KidDemandMoneyList />}
                />
              </Route>
              <Route element={<PrivateRoute />}>
                <Route
                  path="kidDemanedMoneyList"
                  element={<KidDemanedMoneyList />}
                />
              </Route>
              <Route element={<PrivateRoute />}>
                <Route path="newAccount" element={<NewAccount />} />
              </Route>
              <Route element={<PrivateRoute />}>
                <Route path="parentSetting" element={<ParentSetting />} />
              </Route>
              <Route element={<PrivateRoute />}>
                <Route path="kidSetting" element={<KidSetting />} />
              </Route>
              <Route element={<PrivateRoute />}>
                <Route path="kidSetting" element={<KidSetting />} />
              </Route>
              <Route element={<PrivateRoute />}>
                <Route path="mission" element={<MissonPage />} />
              </Route>
              <Route element={<PrivateRoute />}>
                <Route
                  path="mission/detail/:missionId"
                  element={<MissionDetailPage />}
                />
              </Route>
              <Route element={<PrivateRoute />}>
                <Route path="mission/create" element={<MissionCreatPage />} />
              </Route>
              <Route element={<PrivateRoute />}>
                <Route
                  path="mission/create/money"
                  element={<MissionCreateMoney />}
                />
              </Route>
              <Route element={<PrivateRoute />}>
                <Route path="done" element={<DonePage />} />
              </Route>
              <Route path="ready" element={<Preparing />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
        <ToastContainer
          position="bottom-center"
          autoClose={1000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </AppLayout>
    </RecoilRoot>
  );
}

export default App;
