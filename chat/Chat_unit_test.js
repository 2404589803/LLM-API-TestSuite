// 封装 API 请求函数
async function makeApiRequest(modelId, messages, parameters = {}) {
    const startTime = Date.now();
    try {
        const response = await fetch(`${baseUrl}/chat/completions`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: modelId,
                messages: messages,
                ...parameters
            })
        });
        const endTime = Date.now();
        const latency = endTime - startTime;

        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorBody}`);
        }

        const data = await response.json();
        return { data, latency };
    } catch (error) {
        throw error;
    }
}

// 定义测试组
const testGroups = [
    ...messageTests,
    ...assistantMessageTests,
    ...toolMessageTests,
    ...functionMessageTests, // 添加函数消息测试组
];

// 测试模型
async function testModel(modelId) {
    const testResultsContainer = document.createElement('div');
    testResultsContainer.id = `test-results-${modelId}`;
    testResultsContainer.className = 'mt-4 p-4 bg-white rounded-lg shadow';
    
    const testTitle = document.createElement('h3');
    testTitle.className = 'text-lg font-semibold mb-4';
    testTitle.textContent = `模型 ${modelId} 的测试结果`;
    testResultsContainer.appendChild(testTitle);

    const modelDiv = document.querySelector(`#modelList > div > div:has(span[title="${modelId}"])`);
    modelDiv.appendChild(testResultsContainer);

    // 添加消息测试
    for (const testSuite of testGroups) {
        const suiteContainer = document.createElement('div');
        suiteContainer.className = 'mb-6';
        const suiteTitle = document.createElement('h4');
        suiteTitle.className = 'text-md font-medium mb-2';
        suiteTitle.textContent = testSuite.name;
        suiteContainer.appendChild(suiteTitle);

        for (const test of testSuite.tests) {
            const testItem = document.createElement('div');
            testItem.className = 'mb-4';

            const testHeader = document.createElement('div');
            testHeader.className = 'flex items-center justify-between mb-1 cursor-pointer';

            const testNameContainer = document.createElement('div');
            testNameContainer.className = 'flex items-center flex-grow';

            const statusIndicator = document.createElement('span');
            statusIndicator.className = 'w-3 h-3 inline-block rounded-full bg-yellow-500 animate-pulse mr-2';

            const testName = document.createElement('span');
            testName.className = 'text-sm font-medium';
            testName.textContent = test.name;

            const toggleIcon = document.createElement('span');
            toggleIcon.className = 'text-gray-500 ml-1';
            toggleIcon.innerHTML = `
                <svg class="w-4 h-4 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            `;

            const latencySpan = document.createElement('span');
            latencySpan.className = 'text-sm text-gray-500';
            latencySpan.textContent = '测试中';

            testNameContainer.appendChild(statusIndicator);
            testNameContainer.appendChild(testName);
            testNameContainer.appendChild(toggleIcon);

            testHeader.appendChild(testNameContainer);
            testHeader.appendChild(latencySpan);

            testItem.appendChild(testHeader);

            const collapsibleContent = document.createElement('div');
            collapsibleContent.className = 'hidden mt-2';

            const requestInfo = document.createElement('p');
            requestInfo.className = 'text-sm text-gray-600 bg-gray-100 p-2 rounded-md mb-2 whitespace-pre-line overflow-x-auto';
            const messagesString = JSON.stringify(test.test.toString().match(/messages = ([\s\S]*?);/)[1], null, 2);
            requestInfo.textContent = messagesString.replace(/^"|"$/g, '').replace(/\\n/g, '\n').replace(/\\"/g, '"');
            collapsibleContent.appendChild(requestInfo);

            const responseInfo = document.createElement('div');
            responseInfo.className = 'text-sm text-gray-700 bg-gray-200 p-2 rounded-md';
            collapsibleContent.appendChild(responseInfo);

            testItem.appendChild(collapsibleContent);

            testHeader.onclick = () => {
                collapsibleContent.classList.toggle('hidden');
                toggleIcon.innerHTML = collapsibleContent.classList.contains('hidden') 
                    ? `<svg class="w-4 h-4 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                       </svg>` 
                    : `<svg class="w-4 h-4 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path>
                       </svg>`;
            };

            suiteContainer.appendChild(testItem);

            // 开始测试
            test.test(modelId).then(result => {
                statusIndicator.className = 'w-3 h-3 inline-block rounded-full bg-green-500 mr-2';
                latencySpan.textContent = `${result.latency}ms`;
                responseInfo.textContent = result.message;
            }).catch(error => {
                statusIndicator.className = 'w-3 h-3 inline-block rounded-full bg-red-500 mr-2';
                latencySpan.textContent = 'Error';
                responseInfo.textContent = error.message;
            });
        }

        testResultsContainer.appendChild(suiteContainer);
    }
}

// 导出函数以供其他文件使用
export { testModel, makeApiRequest };