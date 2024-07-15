import Modal from '@components/common/modal/modal';
import dynamic from 'next/dynamic';
import {
  useModalAction,
  useModalState,
} from '@components/common/modal/modal.context';
import LoginForm from '@components/auth/login-form';
import SignUpForm from '@components/auth/sign-up-form';
import ForgetPasswordForm from '@components/auth/forget-password-form';
import GenericCombination from '@components/GenericDetails/GenericCombination';

const ManagedModal: React.FC = () => {
  const { isOpen, view } = useModalState();
  const { closeModal } = useModalAction();

  return (
    <Modal open={isOpen} onClose={closeModal}>
      {view === 'LOGIN_VIEW' && <LoginForm />}
      {view === 'SIGN_UP_VIEW' && <SignUpForm />}
      {view === 'FORGET_PASSWORD' && <ForgetPasswordForm />}
    </Modal>
  );
};

export default ManagedModal;
