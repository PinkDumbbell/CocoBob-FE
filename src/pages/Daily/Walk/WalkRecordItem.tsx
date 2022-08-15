import React from 'react';

interface WalkRecordItemProps {
  date: Date;
}
function WalkRecordItem({ date }: WalkRecordItemProps) {
  return (
    <div>
      <div>{date.toLocaleDateString()}</div>
      <div>
        <div>
          <div>
            <span></span>
            <span></span>
          </div>
        </div>
        <div>
          <div>
            <span></span>
            <span></span>
          </div>
        </div>
        <div>
          <div>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
      <div>
        <div></div>
      </div>
    </div>
  );
}
export default React.memo(WalkRecordItem);
