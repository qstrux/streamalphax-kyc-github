/**
 * StreamAlphaX KYC System (Secure Version)
 * Hardened Cloudflare Worker for ID Analyzer DocuPass integration.
 */

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request, event));
});

async function handleRequest(request, event) {
  const url = new URL(request.url);
  const env = event?.env || {};
  if (url.pathname === '/kyc/start') {
    return pageStart(env);
  } else if (url.pathname === '/kyc/upload') {
    return pageUpload(env);
  } else if (url.pathname === '/kyc/success') {
    return pageSuccess(url, env);
  }
  // ...existing API and fallback logic...
  return new Response('Not Found', { status: 404 });
}
    '</head>' +
    '<body>' +
    '  <div class="container">' +
    '    <img src="' + logo + '" alt="' + company + '" style="max-width:80px;margin-bottom:12px;" onerror="this.style.display=\'none\'">' +
    '    <h1>Upload ID</h1>' +
    '    <div id="topNotice" style="border:2px solid #ef4444;background:#fff7f7;padding:12px;border-radius:6px;color:#111;margin-bottom:14px;">' +
    '      <span id="noticeText">Please verify your identity by uploading a government-issued ID. Select the country that issued your document and the type of ID to continue.</span>' +
    '    </div>' +
    '    <form id="uploadForm">' +
    '      <label for="country">Issued Country</label>' +
    '      <select id="country" name="country">' +
    '        <option>United States</option>' +
    '        <option>United Kingdom</option>' +
    '        <option>Canada</option>' +
    '        <option>Australia</option>' +
    '        <option>Other</option>' +
    '      </select>' +
    '      <label for="idtype">Identification Type</label>' +
    '      <select id="idtype" name="idtype">' +
    '        <option>Passport</option>' +
    '        <option>Driver\'s License</option>' +
    '        <option>National ID Card</option>' +
    '      </select>' +
    '      <div style="margin:18px 0;" id="previewArea">' +
    '        <div style="border:2px dashed #cbd5e1;border-radius:8px;padding:28px;text-align:center;background:#ffffff;">' +
    '          <div style="font-size:18px;font-weight:700;color:#374151;margin-bottom:8px;">PASSPORT DATA PAGE</div>' +
    '          <div style="color:#6b7280;margin-bottom:12px;">Passport</div>' +
    '          <button id="uploadPhotoBtn" type="button" style="background:#1e90ff;color:white;border:none;padding:10px 16px;border-radius:6px;font-size:16px;cursor:pointer;">Upload Photos</button>' +
    '        </div>' +
    '      </div>' +
    '      <div class="requirement">' +
    '        <b>Requirement</b>' +
    '        <ul>' +
    '          <li>Your ID must show a clear photo of your face for verification purposes.</li>' +
    '        </ul>' +
    '      </div>' +
    '      <div style="display:flex;gap:12px;margin-top:14px;">' +
    '        <button id="prevBtn" type="button" style="flex:1;background:#fff;border:1px solid #d1d5db;padding:10px;border-radius:6px;cursor:pointer;">← Previous Step</button>' +
    '        <button id="mobileBtn" type="button" style="flex:1;background:#fff;border:1px solid #d1d5db;padding:10px;border-radius:6px;cursor:pointer;">Continue on Mobile</button>' +
    '      </div>' +
    '    </form>' +
    '  </div>' +
    '  <script>' +
    '    function updateNotice() {' +
    '      const country = document.getElementById(\'country\').value;' +
    '      const idtype = document.getElementById(\'idtype\').value;' +
    '      const notice = document.getElementById(\'noticeText\');' +
    '      const it = idtype.toLowerCase();' +
    '      if (it.includes(\'passport\') && country === \'United States\') {' +
    '        notice.textContent = "Please upload a photo of your U.S. passport’s data page to continue.";' +
    '      } else if (it.includes(\'passport\')) {' +
    '        notice.textContent = "Please upload a photo of your " + country + " passport’s data page to continue.";' +
    '      } else if (it.includes(\'driver\')) {' +
    '        if (country === \'United States\') {' +
    '          notice.textContent = "Please upload photos of the front and back of your U.S. driver’s license to continue.";' +
    '        } else {' +
    '          notice.textContent = "Please upload photos of the front and back of your " + country + " driver\'s license to continue.";' +
    '        }' +
    '      } else if (it.includes(\'id\') || it.includes(\'identification\') || it.includes(\'national\')) {' +
    '        if (country === \'United States\') {' +
    '          notice.textContent = "Please upload photos of the front and back of your U.S. ID card to continue.";' +
    '        } else {' +
    '          notice.textContent = "Please upload photos of the front and back of your " + country + " ID card to continue.";' +
    '        }' +
    '      } else {' +
    '        notice.textContent = "Please verify your identity by uploading a government-issued ID. Select the country that issued your document and the type of ID to continue.";' +
    '      }' +
    '    }' +
    '    document.getElementById(\'country\').addEventListener(\'change\', updateNotice);' +
    '    document.getElementById(\'idtype\').addEventListener(\'change\', updateNotice);' +
    '    updateNotice();' +
    '    function updatePreview(){' +
    '      const idtype = document.getElementById(\'idtype\').value.toLowerCase();' +
    '      const country = document.getElementById(\'country\').value;' +
    '      const preview = document.getElementById(\'previewArea\');' +
    '      if (idtype.includes(\'driver\')){' +
    '        preview.innerHTML = "<div style='display:flex;flex-direction:column;gap:12px;'>"' +
    '          + "<div style='border:2px dashed #cbd5e1;border-radius:8px;padding:28px;text-align:center;background:#ffffff;'>"' +
    '            + "<div style='font-size:18px;font-weight:700;color:#374151;margin-bottom:8px;'>FRONT</div>"' +
    '            + "<div style='color:#6b7280;margin-bottom:12px;'>Driver\'s License</div>"' +
    '          + "</div>"' +
    '          + "<div style='border:2px dashed #cbd5e1;border-radius:8px;padding:28px;text-align:center;background:#ffffff;'>"' +
    '            + "<div style='font-size:18px;font-weight:700;color:#374151;margin-bottom:8px;'>BACK</div>"' +
    '            + "<div style='color:#6b7280;margin-bottom:12px;'>Driver\'s License</div>"' +
    '          + "</div>"' +
    '          + "<button id='uploadPhotoBtn' type='button' style='background:#1e90ff;color:white;border:none;padding:10px 16px;border-radius:6px;font-size:16px;cursor:pointer;'>Upload Photos</button>"' +
    '        + "</div>";' +
    '      } else if (idtype.includes(\'id\') || idtype.includes(\'identification\') || idtype.includes(\'national\')){' +
    '        preview.innerHTML = "<div style='display:flex;flex-direction:column;gap:12px;'>"' +
    '          + "<div style='border:2px dashed #cbd5e1;border-radius:8px;padding:28px;text-align:center;background:#ffffff;'>"' +
    '            + "<div style='font-size:18px;font-weight:700;color:#374151;margin-bottom:8px;'>FRONT</div>"' +
    '            + "<div style='color:#6b7280;margin-bottom:12px;'>ID Card</div>"' +
    '          + "</div>"' +
    '          + "<div style='border:2px dashed #cbd5e1;border-radius:8px;padding:28px;text-align:center;background:#ffffff;'>"' +
    '            + "<div style='font-size:18px;font-weight:700;color:#374151;margin-bottom:8px;'>BACK</div>"' +
    '            + "<div style='color:#6b7280;margin-bottom:12px;'>ID Card</div>"' +
    '          + "</div>"' +
    '          + "<button id='uploadPhotoBtn' type='button' style='background:#1e90ff;color:white;border:none;padding:10px 16px;border-radius:6px;font-size:16px;cursor:pointer;'>Upload Photos</button>"' +
    '        + "</div>";' +
    '      } else {' +
    '        preview.innerHTML = "<div style='border:2px dashed #cbd5e1;border-radius:8px;padding:28px;text-align:center;background:#ffffff;'>"' +
    '          + "<div style='font-size:18px;font-weight:700;color:#374151;margin-bottom:8px;'>PASSPORT DATA PAGE</div>"' +
    '          + "<div style='color:#6b7280;margin-bottom:12px;'>Passport</div>"' +
    '          + "<button id='uploadPhotoBtn' type='button' style='background:#1e90ff;color:white;border:none;padding:10px 16px;border-radius:6px;font-size:16px;cursor:pointer;'>Upload Photos</button>"' +
    '        + "</div>";' +
    '      }' +
    '      // reattach listener' +
    '      const up = document.getElementById(\'uploadPhotoBtn\');' +
    '      if (up) { up.addEventListener(\'click\', function() { createSessionAndRedirect(); }); }' +
    '    }' +
    '    document.getElementById(\'country\').addEventListener(\'change\', updatePreview);' +
    '    document.getElementById(\'idtype\').addEventListener(\'change\', updatePreview);' +
    '    updatePreview();' +
    '    async function createSessionAndRedirect(extra){' +
    '      const country = document.getElementById(\'country\').value;' +
    '      const idtype = document.getElementById(\'idtype\').value;' +
    '      try{' +
    '        const res = await fetch("/api/kyc/create-session", {' +
    '          method: "POST",' +
    '          headers: { "Content-Type": "application/json" },' +
    '          body: JSON.stringify({ userId: "user_" + Date.now(), accountType: idtype, country: country, ...extra })' +
    '        });' +
    '        if (!res.ok) { const err = await res.json(); throw new Error(err.error || "Failed to create session"); }' +
    '        const data = await res.json();' +
    '        window.location.href = data.url;' +
    '      } catch (err) {' +
    '        alert("Error: " + err.message);' +
    '      }' +
    '    }' +
    '    document.getElementById(\'uploadPhotoBtn\').addEventListener(\'click\', function() { createSessionAndRedirect(); });' +
    '    document.getElementById(\'mobileBtn\').addEventListener(\'click\', function() { createSessionAndRedirect({ via: "mobile" }); });' +
    '    document.getElementById(\'prevBtn\').addEventListener(\'click\', function() { window.location.href = "/kyc/start"; });' +
    '  </script>' +
    '</body>' +
    '</html>',
    { headers: { 'Content-Type': 'text/html' } }
  );
}

// --- Pages ---
function pageSuccess(url, env) {
  const company = env.COMPANY_NAME || 'StreamAlphaX';
  return new Response(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verification Success - ${company}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: #f8f9fa;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 20px;
    }
    .container {
      background: white;
      padding: 48px 32px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      text-align: center;
      max-width: 500px;
    }
    .icon { font-size: 64px; margin-bottom: 24px; }
    h1 { color: #16a34a; font-size: 28px; margin-bottom: 16px; }
    p { color: #6b7280; font-size: 16px; line-height: 1.6; }
  </style>
</head>
<body>
    <div class="container">
    <div class="icon">✓</div>
    <h1>Verification Complete</h1>
    <p>Your identity has been successfully verified. You can now close this window.</p>
  </div>
</body>
</html>`, { headers: { 'Content-Type': 'text/html' } });
}

function pageReview(url, env) {
  const company = env.COMPANY_NAME || 'StreamAlphaX';
  return new Response(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Manual Review - ${company}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: #f8f9fa;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 20px;
    }
    .container {
      background: white;
      padding: 48px 32px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      text-align: center;
      max-width: 500px;
    }
    .icon { font-size: 64px; margin-bottom: 24px; }
    h1 { color: #f59e0b; font-size: 28px; margin-bottom: 16px; }
    p { color: #6b7280; font-size: 16px; line-height: 1.6; }
  </style>
</head>
<body>
  <div class="container">
    <div class="icon">⏳</div>
    <h1>Manual Review Required</h1>
    <p>Your verification is under manual review. We'll contact you within 24 hours.</p>
  </div>
</body>
</html>`, { headers: { 'Content-Type': 'text/html' } });
}

function pageRejected(url, env) {
  const company = env.COMPANY_NAME || 'StreamAlphaX';
  return new Response(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verification Failed - ${company}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: #f8f9fa;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 20px;
    }
    .container {
      background: white;
      padding: 48px 32px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      text-align: center;
      max-width: 500px;
    }
    .icon { font-size: 64px; margin-bottom: 24px; }
    h1 { color: #ef4444; font-size: 28px; margin-bottom: 16px; }
    p { color: #6b7280; font-size: 16px; line-height: 1.6; }
  </style>
</head>
<body>
  <div class="container">
    <div class="icon">✗</div>
    <h1>Verification Failed</h1>
    <p>We were unable to verify your identity. Please contact support for assistance.</p>
  </div>
</body>
</html>`, { headers: { 'Content-Type': 'text/html' } });
}

function pageStart(env) {
  const company = env.COMPANY_NAME || 'StreamAlphaX';
  const message = 'Your secure financial identity verification is ready';
  const logo = env.LOGO_URL || 'https://streamalphax.com/logo.png';
  
  return new Response(
    '<!DOCTYPE html>' +
    '<html lang="en">' +
    '<head>' +
    '  <meta charset="UTF-8">' +
    '  <meta name="viewport" content="width=device-width, initial-scale=1.0">' +
    '  <title>Identity Verification - ' + company + '</title>' +
    '  <style>' +
    '    * { margin: 0; padding: 0; box-sizing: border-box; }' +
    '    body { ' +
    '      font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', sans-serif;' +
    '      background: #f8f9fa;' +
    '      display: flex;' +
    '      align-items: center;' +
    '      justify-content: center;' +
    '      min-height: 100vh;' +
    '      padding: 20px;' +
    '    }' +
    '    .container {' +
    '      background: white;' +
    '      padding: 48px 32px;' +
    '      border-radius: 8px;' +
    '      box-shadow: 0 2px 8px rgba(0,0,0,0.1);' +
    '      text-align: center;' +
    '      max-width: 500px;' +
    '      width: 100%;' +
    '    }' +
    '    .logo { max-width: 120px; height: auto; margin-bottom: 24px; }' +
    '    h1 { color: #1f2937; font-size: 28px; margin-bottom: 16px; }' +
    '    p { color: #6b7280; font-size: 16px; line-height: 1.6; margin-bottom: 32px; }' +
    '    .btn {' +
    '      background: #4f46e5;' +
    '      color: white;' +
    '      border: none;' +
    '      padding: 14px 32px;' +
    '      font-size: 16px;' +
    '      font-weight: 500;' +
    '      border-radius: 6px;' +
    '      cursor: pointer;' +
    '      transition: background 0.2s;' +
    '    }' +
    '    .btn:hover { background: #4338ca; }' +
    '    .btn:disabled { background: #9ca3af; cursor: not-allowed; }' +
    '    .error { color: #ef4444; margin-top: 16px; font-size: 14px; }' +
    '    .loading { color: #6b7280; margin-top: 16px; font-size: 14px; }' +
    '  </style>' +
    '</head>' +
    '<body>' +
    '  <div class="container">' +
    '    <img src="' + logo + '" alt="' + company + '" class="logo" onerror="this.style.display=\'none\'">' +
    '    <h1>Welcome to ' + company + '</h1>' +
    '    <p>' + message + '</p>' +
    '    <button id="startBtn" class="btn">Continue</button>' +
    '    <div id="message"></div>' +
    '  </div>' +
    '  <script>' +
    '    document.getElementById(\'startBtn\').addEventListener(\'click\', () => {' +
    '      window.location.href = \'/kyc/upload\';' +
    '    });' +
    '  </script>' +
    '</body>' +
    '</html>',
    { headers: { 'Content-Type': 'text/html' } }
  );
}

function pageUpload(env) {
  const company = env.COMPANY_NAME || 'StreamAlphaX';
  const logo = env.LOGO_URL || 'https://streamalphax.com/logo.png';

  return new Response(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Upload ID - ${company}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: #f8f9fa;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 20px;
    }
    .container {
      background: white;
      padding: 32px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      max-width: 420px;
      width: 100%;
    }
    h1 { color: #1f2937; font-size: 20px; margin-bottom: 12px; }
    .note { color: #374151; margin-bottom: 16px; line-height: 1.4; }
    label { display:block; margin-top: 10px; font-size: 14px; color:#374151; }
    select, input[type=file] { width:100%; padding:10px; margin-top:8px; border-radius:6px; border:1px solid #d1d5db; }
    .requirement { margin-top:16px; color:#374151; }
    .requirement b { display:block; margin-bottom:6px; }
    .requirement ul { margin-left:20px; color:#374151; }
    .btn { margin-top:18px; background:#2563eb; color:white; border:none; padding:12px 18px; border-radius:6px; width:100%; font-size:16px; cursor:pointer; }
  </style>
</head>
<body>
  <div class="container">
    <img src="${logo}" alt="${company}" style="max-width:80px;margin-bottom:12px;" onerror="this.style.display='none'">
    <h1>Upload ID</h1>
    <div id="topNotice" style="border:2px solid #ef4444;background:#fff7f7;padding:12px;border-radius:6px;color:#111;margin-bottom:14px;">
      <span id="noticeText">Please verify your identity by uploading a government-issued ID. Select the country that issued your document and the type of ID to continue.</span>
    </div>

    <form id="uploadForm">
      <label for="country">Issued Country</label>
      <select id="country" name="country">
        <option>United States</option>
        <option>United Kingdom</option>
        <option>Canada</option>
        <option>Australia</option>
        <option>Other</option>
      </select>

      <label for="idtype">Identification Type</label>
      <select id="idtype" name="idtype">
        <option>Passport</option>
        <option>Driver's License</option>
        <option>National ID Card</option>
      </select>

      <div style="margin:18px 0;" id="previewArea">
        <div style="border:2px dashed #cbd5e1;border-radius:8px;padding:28px;text-align:center;background:#ffffff;">
          <div style="font-size:18px;font-weight:700;color:#374151;margin-bottom:8px;">PASSPORT DATA PAGE</div>
          <div style="color:#6b7280;margin-bottom:12px;">Passport</div>
          <button id="uploadPhotoBtn" type="button" style="background:#1e90ff;color:white;border:none;padding:10px 16px;border-radius:6px;font-size:16px;cursor:pointer;">Upload Photos</button>
        </div>
      </div>

      <div class="requirement">
        <b>Requirement</b>
        <ul>
          <li>Your ID must show a clear photo of your face for verification purposes.</li>
        </ul>
      </div>

      <div style="display:flex;gap:12px;margin-top:14px;">
        <button id="prevBtn" type="button" style="flex:1;background:#fff;border:1px solid #d1d5db;padding:10px;border-radius:6px;cursor:pointer;">← Previous Step</button>
        <button id="mobileBtn" type="button" style="flex:1;background:#fff;border:1px solid #d1d5db;padding:10px;border-radius:6px;cursor:pointer;">Continue on Mobile</button>
      </div>
    </form>
  </div>

  <script>
    function updateNotice() {
      const country = document.getElementById('country').value;
      const idtype = document.getElementById('idtype').value;
      const notice = document.getElementById('noticeText');
      const it = idtype.toLowerCase();
      if (it.includes('passport') && country === 'United States') {
        notice.textContent = "Please upload a photo of your U.S. passport’s data page to continue.";
      } else if (it.includes('passport')) {
        notice.textContent = 'Please upload a photo of your ' + country + " passport’s data page to continue.";
      } else if (it.includes('driver')) {
        if (country === 'United States') {
          notice.textContent = "Please upload photos of the front and back of your U.S. driver’s license to continue.";
          } else {
          notice.textContent = 'Please upload photos of the front and back of your ' + country + " driver's license to continue.";
        }
      } else if (it.includes('id') || it.includes('identification') || it.includes('national')) {
        if (country === 'United States') {
          notice.textContent = "Please upload photos of the front and back of your U.S. ID card to continue.";
        } else {
          notice.textContent = 'Please upload photos of the front and back of your ' + country + " ID card to continue.";
        }
      } else {
        notice.textContent = 'Please verify your identity by uploading a government-issued ID. Select the country that issued your document and the type of ID to continue.';
      }
    }

    document.getElementById('country').addEventListener('change', updateNotice);
    document.getElementById('idtype').addEventListener('change', updateNotice);
    updateNotice();

    function updatePreview(){
      const idtype = document.getElementById('idtype').value.toLowerCase();
      const country = document.getElementById('country').value;
      const preview = document.getElementById('previewArea');
      if (idtype.includes('driver')){
        preview.innerHTML = '<div style="display:flex;flex-direction:column;gap:12px;">'
          + '<div style="border:2px dashed #cbd5e1;border-radius:8px;padding:28px;text-align:center;background:#ffffff;">'
            + '<div style="font-size:18px;font-weight:700;color:#374151;margin-bottom:8px;">FRONT</div>'
            + '<div style="color:#6b7280;margin-bottom:12px;">Driver\'s License</div>'
          + '</div>'
          + '<div style="border:2px dashed #cbd5e1;border-radius:8px;padding:28px;text-align:center;background:#ffffff;">'
            + '<div style="font-size:18px;font-weight:700;color:#374151;margin-bottom:8px;">BACK</div>'
            + '<div style="color:#6b7280;margin-bottom:12px;">Driver\'s License</div>'
          + '</div>'
          + '<button id="uploadPhotoBtn" type="button" style="background:#1e90ff;color:white;border:none;padding:10px 16px;border-radius:6px;font-size:16px;cursor:pointer;">Upload Photos</button>'
        + '</div>';
      } else if (idtype.includes('id') || idtype.includes('identification') || idtype.includes('national')){
        preview.innerHTML = '<div style="display:flex;flex-direction:column;gap:12px;">'
          + '<div style="border:2px dashed #cbd5e1;border-radius:8px;padding:28px;text-align:center;background:#ffffff;">'
            + '<div style="font-size:18px;font-weight:700;color:#374151;margin-bottom:8px;">FRONT</div>'
            + '<div style="color:#6b7280;margin-bottom:12px;">ID Card</div>'
          + '</div>'
          + '<div style="border:2px dashed #cbd5e1;border-radius:8px;padding:28px;text-align:center;background:#ffffff;">'
            + '<div style="font-size:18px;font-weight:700;color:#374151;margin-bottom:8px;">BACK</div>'
            + '<div style="color:#6b7280;margin-bottom:12px;">ID Card</div>'
          + '</div>'
          + '<button id="uploadPhotoBtn" type="button" style="background:#1e90ff;color:white;border:none;padding:10px 16px;border-radius:6px;font-size:16px;cursor:pointer;">Upload Photos</button>'
        + '</div>';
      } else {
        preview.innerHTML = '<div style="border:2px dashed #cbd5e1;border-radius:8px;padding:28px;text-align:center;background:#ffffff;">'
          + '<div style="font-size:18px;font-weight:700;color:#374151;margin-bottom:8px;">PASSPORT DATA PAGE</div>'
          + '<div style="color:#6b7280;margin-bottom:12px;">Passport</div>'
          + '<button id="uploadPhotoBtn" type="button" style="background:#1e90ff;color:white;border:none;padding:10px 16px;border-radius:6px;font-size:16px;cursor:pointer;">Upload Photos</button>'
        + '</div>';
      }
      // reattach listener
      const up = document.getElementById('uploadPhotoBtn');
      if (up) { up.addEventListener('click', () => createSessionAndRedirect()); }
    }

    document.getElementById('country').addEventListener('change', updatePreview);
    document.getElementById('idtype').addEventListener('change', updatePreview);
    updatePreview();

    async function createSessionAndRedirect(extra={}){
      const country = document.getElementById('country').value;
      const idtype = document.getElementById('idtype').value;
      try{
        const res = await fetch('/api/kyc/create-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: 'user_' + Date.now(), accountType: idtype, country, ...extra })
        });
        if (!res.ok) { const err = await res.json(); throw new Error(err.error || 'Failed to create session'); }
        const data = await res.json();
        window.location.href = data.url;
      } catch (err) {
        alert('Error: ' + err.message);
      }
    }

    document.getElementById('uploadPhotoBtn').addEventListener('click', () => createSessionAndRedirect());
    document.getElementById('mobileBtn').addEventListener('click', () => createSessionAndRedirect({ via: 'mobile' }));
    document.getElementById('prevBtn').addEventListener('click', () => { window.location.href = '/kyc/start'; });
  </script>
</body>
</html>
`, { headers: { 'Content-Type': 'text/html' } });
}
