import React, { FC } from 'react';
import{ QuestionTitlePropsType,QuestionTitleDefaultProps } from './interface';
import { Typography } from 'antd';

const { Title } = Typography;
const QuestionTitle:FC<QuestionTitlePropsType> = (props: QuestionTitlePropsType) =>{
        const { title, level=1, isCenter } ={...QuestionTitleDefaultProps, ...props} ;

        return(
            <Title level={level}
                style={{textAlign:isCenter?'center':'start',
                marginBottom:0,
                fontSize:'24px'}}>
                    
                {title}
            </Title>
        )
}

export default QuestionTitle;