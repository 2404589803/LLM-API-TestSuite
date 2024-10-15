const assistantMessageTests = [
    {
        name: "助手消息测试",
        tests: [
            {
                name: "助手消息 - 基本文本内容",
                test: async (modelId) => {
                    const messages = [
                        { role: "assistant", content: "Here is a basic response from the assistant." }
                    ];
                    return await runTest(modelId, messages);
                }
            },
            {
                name: "助手消息 - 内容为数组",
                test: async (modelId) => {
                    const messages = [
                        { 
                            role: "assistant", 
                            content: [
                                { type: "text", text: "This is part 1 of the response." },
                                { type: "text", text: "This is part 2 of the response." }
                            ]
                        }
                    ];
                    return await runTest(modelId, messages);
                }
            },
            {
                name: "助手消息 - 拒绝回复",
                test: async (modelId) => {
                    const messages = [
                        { role: "assistant", content: { type: "refusal", text: "I'm sorry, I cannot assist with that request." } }
                    ];
                    return await runTest(modelId, messages);
                }
            },
            {
                name: "助手消息 - 带名称",
                test: async (modelId) => {
                    const messages = [
                        { role: "assistant", content: "This is a named assistant response.", name: "HelperBot" }
                    ];
                    return await runTest(modelId, messages);
                }
            },
            {
                name: "助手消息 - 工具调用",
                test: async (modelId) => {
                    const messages = [
                        { 
                            role: "assistant", 
                            tool_calls: [
                                {
                                    id: "tool-1234",
                                    type: "function",
                                    function: {
                                        name: "fetchData",
                                        arguments: JSON.stringify({ query: "latest news" })
                                    }
                                }
                            ]
                        }
                    ];
                    return await runTest(modelId, messages);
                }
            }
        ]
    }
];

// 导出测试组，以便在 unit_test.js 中使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = assistantMessageTests;
} else {
    window.assistantMessageTests = assistantMessageTests;
}