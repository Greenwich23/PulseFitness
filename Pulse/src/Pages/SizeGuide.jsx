import { FaRuler } from "react-icons/fa";
import styles from "./sizeGuide.module.css";
export default function SizeGuide() {
  return (
    <div className={styles.sizeGuide}>
      <h2>Size Guide</h2>
      <p className={styles.sizeGuideP}>
        Find your perfect fit. Use our comprehensive sizing charts to choose the
        right size for your body.
      </p>
      <hr />
      <div className={styles.MeasureSection}>
        <div className={styles.MeasureTitleDiv}>
          <FaRuler className={styles.rulerIcon}/>
          <h3>How To Measure</h3>
        </div>
        <div className={styles.shapeDiv}>
          <div className={styles.shapeCards}>
            <h4>Bust/Chest</h4>
            <p>
              Measure around the fullest part of your bust/chest, keeping the
              tape parallel to the floor.
            </p>
          </div>
          <div className={styles.shapeCards}>
            <h4>Waist</h4>
            <p>
              Measure around your natural waistline, keeping the tape
              comfortably loose.
            </p>
          </div>
          <div className={styles.shapeCards}>
            <h4>Hips</h4>
            <p>
              Measure around the fullest part of your hips, approximately 8
              inches below your waist.
            </p>
          </div>
        </div>
        <div className={styles.womenSizeChartDiv}>
          <h3>Women Size Chart</h3>
          <div className={styles.womenSizeTable}>
            <table className={styles.customTable}>
              <thead>
                <tr>
                  <th>Size</th>
                  <th>Bust (in)</th>
                  <th>Waist (in)</th>
                  <th>Hips (in)</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>XXS</td>
                  <td>30-32</td>
                  <td>23-25</td>
                  <td>33-35</td>
                </tr>
                <tr>
                  <td>XS</td>
                  <td>32-34</td>
                  <td>25-27</td>
                  <td>35-37</td>
                </tr>
                <tr>
                  <td>S</td>
                  <td>34-36</td>
                  <td>27-29</td>
                  <td>37-39</td>
                </tr>
                <tr>
                  <td>M</td>
                  <td>36-38</td>
                  <td>29-31</td>
                  <td>39-41</td>
                </tr>
                <tr>
                  <td>L</td>
                  <td>38-40</td>
                  <td>31-33</td>
                  <td>41-43</td>
                </tr>
                <tr>
                  <td>XL</td>
                  <td>40-42</td>
                  <td>33-35</td>
                  <td>43-45</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
         <div className={styles.menSizeChartDiv}>
          <h3>Men Size Chart</h3>
          <div className={styles.menSizeTable}>
            <table className={styles.customTable}>
              <thead>
                <tr>
                  <th>Size</th>
                  <th>Chest (in)</th>
                  <th>Waist (in)</th>
                  <th>Hips (in)</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>XS</td>
                  <td>33-35</td>
                  <td>27-29</td>
                  <td>33-35</td>
                </tr>
                <tr>
                  <td>S</td>
                  <td>35-37</td>
                  <td>29-31</td>
                  <td>35-37</td>
                </tr>
                <tr>
                  <td>M</td>
                  <td>38-40</td>
                  <td>32-34</td>
                  <td>38-40</td>
                </tr>
                <tr>
                  <td>L</td>
                  <td>42-44</td>
                  <td>36-38</td>
                  <td>42-44</td>
                </tr>
                <tr>
                  <td>XL</td>
                  <td>46-48</td>
                  <td>40-42</td>
                  <td>46-48</td>
                </tr>
                <tr>
                  <td>XXL</td>
                  <td>50-52</td>
                  <td>44-46</td>
                  <td>50-52</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className={styles.fitTipsDiv}>
            <h3>Fit Tips</h3>
            <div className={styles.fitTipsContainer}>
                <div className={styles.fitTipsCard}>
                    <h4>Between Sizes?</h4>
                    <p>If you're between sizes, we recommend sizing up for a more relaxed fit, or sizing down for a more compressive fit. Check individual product descriptions for specific fit recommendations.</p>
                </div>
                <div className={styles.fitTipsCard}>
                    <h4>Sports Bra Sizing</h4>
                    <p>Our sports bras follow the same XS-XL sizing. For reference: XS (32A-32B), S (34A-34C), M (36A-36D), L (38B-38DD), XL (40C-40DDD).</p>
                </div>
                <div className={styles.fitTipsCard}>
                    <h4>Length Guide</h4>
                    <p>Most of our leggings are available in regular (28" inseam) and long (31" inseam) lengths. Check product pages for specific length options..</p>
                </div>
                <div className={styles.fitTipsCard}>
                    <h4>Still Unsure?</h4>
                    <p>Contact our customer service team for personalized sizing assistance. We're here to help you find your perfect fit!</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
