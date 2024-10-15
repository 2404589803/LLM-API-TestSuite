const toolMessageTests = [
    {
        name: "工具消息测试",
        tests: [
            {
                name: "基本工具消息 - 字符串内容",
                test: async (modelId) => {
                    const messages = [
                        { role: "tool", content: "This is a response from the tool." },
                        { role: "user", content: "What can you do?" }
                    ];
                    return await runTest(modelId, messages);
                }
            },
            {
                name: "工具消息 - 内容为数组",
                test: async (modelId) => {
                    const messages = [
                        { 
                            role: "tool", 
                            content: [
                                { type: "text", text: "This is part 1 of the tool response." },
                                { type: "text", text: "This is part 2 of the tool response." }
                            ]
                        },
                        { role: "user", content: "Can you elaborate?" }
                    ];
                    return await runTest(modelId, messages);
                }
            },
            {
                name: "工具消息 - 带工具调用ID",
                test: async (modelId) => {
                    const messages = [
                        { 
                            role: "tool", 
                            content: "This message is responding to a tool call.",
                            tool_call_id: "tool-5678"
                        },
                        { role: "user", content: "What did the tool say?" }
                    ];
                    return await runTest(modelId, messages);
                }
            }
        ]
    }
];

// 导出测试组，以便在其他文件中使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = toolMessageTests;
} else {
    window.toolMessageTests = toolMessageTests;
}