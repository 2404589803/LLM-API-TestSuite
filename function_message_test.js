const functionMessageTests = [
    {
        name: "函数消息测试",
        tests: [
            {
                name: "基本函数消息 - 字符串内容",
                test: async (modelId) => {
                    const messages = [
                        { role: "function", content: "This is a response from the function.", name: "exampleFunction" },
                        { role: "user", content: "What can this function do?" }
                    ];
                    return await runTest(modelId, messages);
                }
            },
            {
                name: "函数消息 - 内容为 null",
                test: async (modelId) => {
                    const messages = [
                        { role: "function", content: null, name: "exampleFunction" },
                        { role: "user", content: "What is the result of the function?" }
                    ];
                    return await runTest(modelId, messages);
                }
            },
            {
                name: "函数消息 - 带函数名称",
                test: async (modelId) => {
                    const messages = [
                        { role: "function", content: "This function is called.", name: "exampleFunction" },
                        { role: "user", content: "Can you explain what this function does?" }
                    ];
                    return await runTest(modelId, messages);
                }
            }
        ]
    }
];

// 导出测试组，以便在其他文件中使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = functionMessageTests;
} else {
    window.functionMessageTests = functionMessageTests;
}