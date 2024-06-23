import classNames from 'classnames/bind';
import styles from './goodRoad.module.scss';

const cx = classNames.bind(styles);

export function GoodRoad(): JSX.Element {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('ba_prompt_top')}>
        Good Road
        <div className={cx('R_number')}>2</div>
      </div>
      <div className={cx('scroll_range')}>
        <div className={cx('ba_prompt_btm')}>
          <div className={cx('prompt_content')}>
            <div className={cx('prompt_L')}>
              <div className={cx('countdown', 'prompt_count')}>12</div>
              <div className={cx('prompt_L--box')}>
                <span className={cx('white_t')}>
                  <span className={cx('white_t')}> Xóc Đĩa</span>C
                </span>
                <span className={cx('BacPrompt')}>
                  <div className={cx('bg_SetIn')}>
                    <span className={cx('B_PromptT2')}>Bệt C</span>
                    <span className={cx('B_PromptT')}>6</span>
                  </div>
                </span>
              </div>
            </div>
            <div className={cx('prompt_R')}>
              <div className={cx('prompt_array')}>
                <div className={cx('prompt_blue_ring')}></div>
                <div className={cx('prompt_blue_ring')}></div>
                <div className={cx('prompt_blue_ring')}></div>
                <div className={cx('prompt_blue_ring')}></div>
              </div>
              <span className={cx('prompt_arrow')}></span>
            </div>
          </div>
        </div>

        <div className={cx('ba_prompt_btm')}>
          <div className={cx('prompt_content')}>
            <div className={cx('prompt_L')}>
              <div className={cx('prompt_count', 'countWord')}>KT</div>
              <div className={cx('prompt_L--box')}>
                <span className={cx('white_t')}>
                  <span className={cx('white_t')}> Xóc Đĩa</span>B
                </span>
                <span className={cx('')}>
                  <div className={cx('bg_SetIn')}>
                    <span className={cx('gold_t')}>Road 4</span>
                  </div>
                </span>
              </div>
            </div>
            <div className={cx('prompt_R')}>
              <div className={cx('prompt_array')}>
                <div className={cx('prompt_red_ring')}></div>
              </div>
              <div className={cx('prompt_array')}>
                <div className={cx('prompt_blue_ring')}></div>
              </div>
              <div className={cx('prompt_array')}>
                <div className={cx('prompt_red_ring')}></div>
              </div>
              <div className={cx('prompt_array')}>
                <div className={cx('prompt_blue_ring')}></div>
              </div>
              <span className={cx('prompt_arrow')}></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
