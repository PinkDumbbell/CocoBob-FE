import { Link } from 'react-router-dom';

import BottomSheet from '@/components/BottomSheet';
import EmailLoginForm from './components/EmailLoginForm';
import JoinLink from './components/JoinLink';

const EmailLoginSheet = ({
  isOpen,
  close,
  openSignUpSheet,
}: {
  isOpen: boolean;
  close: () => void;
  openSignUpSheet: () => void;
}) => (
  <BottomSheet isOpen={isOpen} close={close}>
    <div className="w-full h-full py-2 px-2 flex flex-col items-center justify-between">
      <div className="w-full flex flex-col items-center gap-2 bg-white">
        <h2>로그인</h2>
        <EmailLoginForm />
        <Link to="/find" className="font-normal text-[#E85354]">
          아이디/비밀번호 찾기
        </Link>
      </div>
      <div className="border-t border-gray-200 w-full flex flex-col items-center py-4 gap-4">
        <div className="flex justify-center items-center gap-4">
          <button className="rounded-full bg-gray-300 w-12 h-12">K</button>
          <button className="rounded-full bg-gray-300 w-12 h-12">A</button>
          <button className="rounded-full bg-gray-300 w-12 h-12">G</button>
        </div>
        <JoinLink color="primary" openSignUpSheet={openSignUpSheet} />
      </div>
    </div>
  </BottomSheet>
);

export default EmailLoginSheet;
