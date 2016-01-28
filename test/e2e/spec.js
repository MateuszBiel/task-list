describe('task-manager e2e test:', function() {
    it('should have a title - just simple test', function() {
        browser.get('http://10.30.0.44:8080');
        expect(browser.getTitle()).toEqual('task list');
    });
    it('sesnding newt task to server', function() {
        browser.get('http://10.30.0.44:8080');
        console.log("test");
        browser.driver.sleep(1000);
        var elementCount;
        element.all(by.repeater('todo in main.taskList')).count().then(function(count) {
            console.log(count);
            elementCount = count;
        });
        
        element(by.model('main.formData.text')).sendKeys("e2e tests");
        var newLessonDate = element(by.model('main.formData.date'));
        newLessonDate.sendKeys('17-01-2016');
        var select = element(by.model('main.formData.priority'));
        select.$('[value="object:4"]').click();
        // browser.driver.sleep(1000);
        element(by.id('active-btn')).click();
        // browser.driver.sleep(1000);
        console.log(elementCount);
        //browser.driver.sleep(1000);
        element(by.id('btn-submit')).click();
        //browser.driver.sleep(1000);
        element.all(by.repeater('todo in main.taskList')).count().then(function(count) {
            console.log(elementCount + ' ' + count);
            expect(elementCount).not.toEqual(count);
        });

    });

});
