import { FC } from 'react';

interface DukDamItemProps {
  id: string;
  content: string;
}

const DukDamItem: FC<DukDamItemProps> = ({ id, content }) => {
  const handleDelete = async () => {
    const confirmed = confirm('덕담을 삭제하시겠습니까?');
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/dukdams/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        alert('덕담이 삭제되었습니다.');
        // 페이지를 새로고침하거나 상태를 업데이트하세요.
        window.location.reload();
      } else {
        const data = await res.json();
        alert(`삭제 실패: ${data.error}`);
      }
    } catch (error) {
      console.error('Error deleting dukdam:', error);
      alert('덕담 삭제 중 오류가 발생했습니다.');
    }
  };

  return (
    <li className="mb-2 p-2 border rounded flex justify-between items-center">
      <span className="text-blue-600">{content}</span>
      <button
        onClick={handleDelete}
        className="px-2 py-1 bg-red-500 text-white rounded"
      >
        삭제
      </button>
    </li>
  );
};

export default DukDamItem;
