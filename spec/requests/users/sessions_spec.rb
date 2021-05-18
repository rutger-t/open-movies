require 'rails_helper'

RSpec.describe "Sessions", type: :request do
  let(:user) { create_user }
  let(:login_url) { '/users/login' }
  let(:logout_url) { '/users/logout' }

  context 'When logging in' do
    before do
      post login_url, params: {
        user: {
          email: user.email,
          password: user.password
        }
      }
    end

    it 'returns a token' do
      expect(response.headers['Authorization']).to be_present
    end

    it 'returns 200' do
      expect(response.status).to eq(200)
    end
  end

  context 'When password is missing' do
    before do
      post login_url, params: {
        user: {
          email: user.email,
          password: nil
        }
      }
    end

    it 'returns 401' do
      expect(response.status).to eq(401)
    end
  end

  context 'When logging out' do
    it 'returns 204' do
      delete logout_url

      expect(response).to have_http_status(204)
    end
  end
end
