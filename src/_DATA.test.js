import { _saveQuestion, _saveQuestionAnswer } from './_DATA';

test('should _saveQuestion()', () => {
    return _saveQuestion({
        optionOneText: 'test1',
        optionTwoText: 'test2',
        author: 'mtsamis'
    }).then(data => {
        expect(data.optionOne).toEqual(
            {
                "text": "test1",
                "votes": [],
            }
        );
        expect(data.optionTwo).toEqual(
            {
                "text": "test2",
                "votes": [],
            }
        );
        expect(data.author).toBe('mtsamis');
    });
});

test('should not _saveQuestion()', async () => {
    await expect(_saveQuestion({})).rejects.toEqual("Please provide optionOneText, optionTwoText, and author");
});

test('should _saveQuestionAnswer', () => {
    return _saveQuestionAnswer({
        authedUser: "sarahedo",
        qid: "vthrdm985a262al8qx3do",
        answer: "optionOne"
    }).then(data => {
        expect(data).toBeTruthy();
    })
});

test('should not _saveQuestionAnswer()', async () => {
    await expect(_saveQuestionAnswer({})).rejects.toEqual("Please provide authedUser, qid, and answer");
});