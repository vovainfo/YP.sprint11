module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: { // ������ ��������� ������� ����� ������������
                    edge: "17",
                    firefox: "60",
                    chrome: "64",
                    safari: "11.1",
                },
                useBuiltIns: "usage", // ��� ��������� babel-polyfill, ���� ����� �������� usage, �� ����� ������������ �������� ��� ������ ��������� ������� ������� ����.
                corejs: "3.2.1", // ���� ���������� ������ corejs
            },
        ],
    ],
};