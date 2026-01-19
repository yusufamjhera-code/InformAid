const fetch = require('node-fetch');

const API_BASE_URL = 'http://localhost:3000/api';

async function testEndpoint(method, url, body = null) {
  try {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    console.log(`\nTesting ${method} ${url}`);
    const response = await fetch(url, options);
    const data = await response.json();

    console.log(`Status: ${response.status}`);
    console.log('Response:', JSON.stringify(data, null, 2));

    return response.ok;
  } catch (error) {
    console.error('Error:', error.message);
    return false;
  }
}

async function testAllEndpoints() {
  console.log('Starting API tests...\n');

  // Test GET all schemes
  await testEndpoint('GET', `${API_BASE_URL}/schemes`);

  // Test GET schemes by disability type
  await testEndpoint('GET', `${API_BASE_URL}/schemes?disability_type=visual_impairment`);

  // Test GET specific scheme
  await testEndpoint('GET', `${API_BASE_URL}/schemes/VI001`);

  // Test GET all disability types
  await testEndpoint('GET', `${API_BASE_URL}/disability-types`);

  // Test POST new scheme
  const newScheme = {
    scheme_id: 'TEST001',
    scheme_name: 'Test Scheme',
    disability_type: 'visual_impairment',
    summary: 'This is a test scheme',
    full_description: 'Full description of the test scheme',
    eligibility_criteria: ['Test criteria'],
    required_documents: ['Test document'],
    benefits: ['Test benefit'],
    application_process: 'Test process',
    government_portal_link: 'https://test.gov.in'
  };
  await testEndpoint('POST', `${API_BASE_URL}/schemes`, newScheme);

  // Test PUT update scheme
  const updatedScheme = {
    ...newScheme,
    scheme_name: 'Updated Test Scheme'
  };
  await testEndpoint('PUT', `${API_BASE_URL}/schemes/TEST001`, updatedScheme);

  // Test DELETE scheme
  await testEndpoint('DELETE', `${API_BASE_URL}/schemes/TEST001`);

  console.log('\nAPI tests completed!');
}

testAllEndpoints(); 