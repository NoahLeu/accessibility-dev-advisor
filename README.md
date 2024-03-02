# Accessibility Dev Advisor

This is a tool that allows developers to analyze the context of a specific application and receive relevant accessibility advice. The tool works by asking questions on the features, context and users of the application. After answering the questions, the tool will provide a list of relevant accessibility recommendations. These are based on well known accessibility guidelines. The guidelines used were the:

- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [ATAG 2.0](https://www.w3.org/TR/ATAG20/)
- [UAAG 2.0](https://www.w3.org/TR/UAAG20/)
- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)

This tool was created as part of my bachelor thesis at the University of Rostock. The thesis analyzed the guidelines mentioned for contextual aspects usually not considered in the guidelines. The tool was created to help developers to consider these aspects when developing applications. Further the tool was supposed to aid in developers being able to easier understand the topic and include accessibility in their development process.

## How to use the tool

The tool is a web application and can be accessed through the following link: [Accessibility Dev Advisor](https://accessibility-dev-advisor.vercel.app/).

If you want to run the tool locally, you can clone the repository and run the following commands:

```bash
npm install
npm start
```

The tool will then be available at `http://localhost:3000/`.
