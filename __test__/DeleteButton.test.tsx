import DeleteButton from '../src/components/DeleteButton';
import { render, screen } from '@testing-library/react';

it('DeleteButton is function when clicked ', () => {
  const value = 5;
  render(<DeleteButton value={value} />);

  const deleteButton = screen.getByText('削除');
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => ({ success: true }),
  });

  deleteButton.click();

  expect(fetch).toHaveBeenCalledWith(
    `/api/delete_cart_items?item_id=eq.${value}`,
    {
      method: 'DELETE',
      body: JSON.stringify({
        item_id: value,
      }),
    }
  );
});
