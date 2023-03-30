import { useState } from 'react';
import { useKey } from 'react-use';

const [modal, setModal] = useState('close');
const [modalOpen, setModalOpen] = useState('false');

//カートアイコンがクリックされると、モーダルを表示し、背景を暗くする
export function OpenModal() {
  setModal('open');
  setModalOpen('true');
}

//×ボタンがクリックされると、モーダルを非表示にし、背景を元に戻す
export function CloseModal() {
  setModal('close');
  setModalOpen('false');
}

//エスケープボタンが押された時にモーダルを閉じる
export function Escape() {
  useKey('Escape', CloseModal);
}
