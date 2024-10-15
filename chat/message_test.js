const messageTests = [
    {
        name: "系统消息测试",
        tests: [
            {
                name: "基本系统消息 - 字符串内容",
                test: async (modelId) => {
                    const messages = [
                        { role: "system", content: "You are a helpful assistant." },
                        { role: "user", content: "Hello" }
                    ];
                    return await runTest(modelId, messages);
                }
            },
            {
                name: "系统消息 - 带名称",
                test: async (modelId) => {
                    const messages = [
                        { role: "system", content: "You are a helpful assistant.", name: "AI_Assistant" },
                        { role: "user", content: "Hello" }
                    ];
                    return await runTest(modelId, messages);
                }
            },
            {
                name: "系统消息 - 内容为数组（单个文本）",
                test: async (modelId) => {
                    const messages = [
                        { 
                            role: "system", 
                            content: [
                                { type: "text", text: "You are a helpful assistant." }
                            ]
                        },
                        { role: "user", content: "Hello" }
                    ];
                    return await runTest(modelId, messages);
                }
            },
            {
                name: "系统消息 - 特殊字符",
                test: async (modelId) => {
                    const messages = [
                        { role: "system", content: "You are a helpful assistant. Remember: 1) Use emojis 😊, 2) Include URLs https://example.com, 3) Use \"quotes\" and 'apostrophes', 4) Use <html> tags." },
                        { role: "user", content: "Hello" }
                    ];
                    return await runTest(modelId, messages);
                }
            },
            {
                name: "系统消息 - 多语言",
                test: async (modelId) => {
                    const messages = [
                        { role: "system", content: "You are a multilingual assistant. Respond in the language of the user's message. 你是一个多语言助手。用用户消息的语言回复。" },
                        { role: "user", content: "你好，今天心情怎么样？" }
                    ];
                    return await runTest(modelId, messages);
                }
            }
        ]
    },
    {
        name: "用户消息测试",
        tests: [
            {
                name: "基本用户消息 - 字符串内容",
                test: async (modelId) => {
                    const messages = [
                        { role: "user", content: "Hello, how are you?" }
                    ];
                    return await runTest(modelId, messages);
                }
            },
            {
                name: "用户消息 - 带名称（基本）",
                test: async (modelId) => {
                    const messages = [
                        { role: "user", content: "Hello, how are you?", name: "User1" }
                    ];
                    return await runTest(modelId, messages);
                }
            },
            {
                name: "用户消息 - 带名称（数组内容）",
                test: async (modelId) => {
                    const messages = [
                        { 
                            role: "user", 
                            content: [
                                { type: "text", text: "Can you explain quantum computing?" }
                            ],
                            name: "QuantumEnthusiast"
                        }
                    ];
                    return await runTest(modelId, messages);
                }
            },
            {
                name: "用户消息 - 特殊字符",
                test: async (modelId) => {
                    const messages = [
                        { role: "user", content: "Can you explain these symbols: @#$%^&*()_+{}|:<>?~`-=[]\\;',./" }
                    ];
                    return await runTest(modelId, messages);
                }
            },
            {
                name: "用户消息 - 多语言",
                test: async (modelId) => {
                    const messages = [
                        { role: "user", content: "你好，Comment allez-vous? Wie geht es Ihnen? こんにちは、お元気ですか？" }
                    ];
                    return await runTest(modelId, messages);
                }
            }
        ]
    }
];

// 导出测试组，以便在 unit_test.js 中使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = messageTests;
} else {
    window.messageTests = messageTests;
}