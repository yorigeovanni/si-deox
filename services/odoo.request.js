import storage from './storage';

const config = {
  baseURL: process.env.EXPO_PUBLIC_ODOO_URL || 'https://odoo-dev.deoairport.co.id',
  db: process.env.EXPO_PUBLIC_ODOO_DB || 'omahmojopahit',
};

export const requestOtp = async (np) => {
  try {
    console.log('🔑 Requesting OTP for NP:', np);
    
    const response = await fetch(`${config.baseURL}/api/auth/request-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: Math.floor(Math.random() * 1000000000),
        params: {
          np,
        },
      }),
    });

    const data = await response.json();

    if (data.error) {
      return {
        success: false,
        error: data.error.data.message || 'Failed to request OTP',
      };
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error('❌ Request OTP Error:', error);
    return {
      success: false,
      error: error.message === 'Failed to fetch'
        ? 'Unable to connect to the server. Please check your connection.'
        : 'An error occurred while requesting OTP. Please try again.',
    };
  }
};

export const verifyOtp = async (np, otp) => {
  try {
    console.log('🔑 Verifying OTP for NP:', np);
    
    const response = await fetch(`${config.baseURL}/api/auth/verify-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: Math.floor(Math.random() * 1000000000),
        params: {
          np,
          otp,
        },
      }),
    });

    const data = await response.json();

    if (data.error) {
      return {
        success: false,
        error: data.error.data.message || 'Invalid OTP',
      };
    }

    const result = data.result;
    if (!result || !result.uid) {
      return {
        success: false,
        error: 'Invalid response from server',
      };
    }

    const session = {
      uid: result.uid,
      username: result.username,
      name: result.name,
      company_id: result.company_id,
      user_context: result.user_context || {},
      db: config.db,
    };

    await storage.setItem('session', JSON.stringify(session));

    return {
      success: true,
      user: {
        id: result.uid,
        name: result.name,
        email: result.username,
      },
    };
  } catch (error) {
    console.error('❌ Verify OTP Error:', error);
    return {
      success: false,
      error: error.message === 'Failed to fetch'
        ? 'Unable to connect to the server. Please check your connection.'
        : 'An error occurred while verifying OTP. Please try again.',
    };
  }
};

export const logout = async () => {
  try {
    await fetch(`${config.baseURL}/web/session/destroy`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: Math.floor(Math.random() * 1000000000),
      }),
    });
    await storage.deleteItem('session');
  } catch (error) {
    console.error('❌ Logout Error:', error);
    throw error;
  }
};

export const callKw = async (params) => {
  try {
    const sessionStr = await storage.getItem('session');
    if (!sessionStr) {
      throw new Error('No active session');
    }

    const session = JSON.parse(sessionStr);
    const { model, method, args, kwargs = {} } = params;

    if (!kwargs.context) {
      kwargs.context = {};
    }
    if (!kwargs.context.lang) {
      kwargs.context.lang = session.user_context.lang || 'en_US';
    }

    const response = await fetch(`${config.baseURL}/web/dataset/call_kw`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: Math.floor(Math.random() * 1000000000),
        params: {
          model,
          method,
          args,
          kwargs,
        },
      }),
    });

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.data.message || 'API call failed');
    }

    return data.result;
  } catch (error) {
    console.error(`❌ API Error (${params.model}.${params.method}):`, error);
    throw error;
  }
};