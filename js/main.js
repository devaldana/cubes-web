const points = new Map();

const savePoint = () => {
    const point = getPoint();

    if(isValidPoint(point)) {
        points.set(getPointKey(point), point);
        updateList();
    }
};

const removePoint = () => {
    const point = getPoint();
    const key = getPointKey(point);
    points.delete(key);
    updateList();
};

const query = async () => {
    const depth = +getElement('spaceDepth').value;
    const pointA = getThresholdPoint('A');
    const pointB = getThresholdPoint('B');

    if(isValidPoint(pointA) && isValidPoint(pointB) && points.size > 0) {
        disableQueryButton();
        const pointsArr = [];
        points.forEach(point => pointsArr.push(point));
        const request = new SpaceRequest(depth, pointA, pointB, pointsArr);
        const body = JSON.stringify(request);

        try {
            const query = await fetch(url, {method, body, headers});
            const response = await query.json();

            if(query.ok) {
                updateResult(response);
            } else {
                showMessage(response.message);
            }
        } catch(exception) {
            showMessage(exception.message);
        } finally {
            enableQueryButton();
        }
    } else {
        showMessage('add valid points');
    }
};