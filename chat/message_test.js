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
                name: "用户消息 - 带名称（混合内容）",
                test: async (modelId) => {
                    const messages = [
                        { 
                            role: "user", 
                            content: [
                                { type: "text", text: "What's in this image?" },
                                { type: "image_url", image_url: { url: "https://upload.wikimedia.org/wikipedia/commons/0/04/Apple_II_Plus_cropped.jpg" } }
                            ],
                            name: "ImageAnalyst"
                        }
                    ];
                    return await runTest(modelId, messages);
                }
            },
            {
                name: "用户消息 - 内容为数组（单个文本）",
                test: async (modelId) => {
                    const messages = [
                        { 
                            role: "user", 
                            content: [
                                { type: "text", text: "Can you explain quantum computing?" }
                            ]
                        }
                    ];
                    return await runTest(modelId, messages);
                }
            },
            {
                name: "用户消息 - 内容为数组（多个文本）",
                test: async (modelId) => {
                    const messages = [
                        { 
                            role: "user", 
                            content: [
                                { type: "text", text: "I have two questions:" },
                                { type: "text", text: "1. What is AI?" },
                                { type: "text", text: "2. How does machine learning work?" }
                            ]
                        }
                    ];
                    return await runTest(modelId, messages);
                }
            },
            {
                name: "用户消息 - 内容为数组（文本和图片URL）",
                test: async (modelId) => {
                    const messages = [
                        { 
                            role: "user", 
                            content: [
                                { type: "text", text: "What's in this image?" },
                                { type: "image_url", image_url: { url: "https://upload.wikimedia.org/wikipedia/commons/0/04/Apple_II_Plus_cropped.jpg" } }
                            ]
                        }
                    ];
                    return await runTest(modelId, messages);
                }
            },
            {
                name: "用户消息 - 内容为数组（多个图片URL）",
                test: async (modelId) => {
                    const messages = [
                        { 
                            role: "user", 
                            content: [
                                { type: "text", text: "Compare these two images:" },
                                { type: "image_url", image_url: { url: "https://upload.wikimedia.org/wikipedia/commons/0/04/Apple_II_Plus_cropped.jpg" } },
                                { type: "image_url", image_url: { url: "https://upload.wikimedia.org/wikipedia/commons/d/d3/Apple_macintosh_lcII.jpg" } }
                            ]
                        }
                    ];
                    return await runTest(modelId, messages);
                }
            },
            {
                name: "用户消息 - 混合 URL 和 Base64 图片",
                test: async (modelId) => {
                    const messages = [
                        { 
                            role: "user", 
                            content: [
                                { type: "text", text: "这两张图分别是什么" },
                                { type: "image_url", image_url: { url: "https://upload.wikimedia.org/wikipedia/commons/0/04/Apple_II_Plus_cropped.jpg" } },
                                { type: "image_url", image_url: { url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==" } }
                            ]
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
            },
        ]
    }
];

// 导出测试组，以便在 unit_test.js 中使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = messageTests;
} else {
    window.messageTests = messageTests;
}